import { useUploadAvatar } from '@/features/article/userAvatar';
import type { ProfileUpdate } from '@/schemas/AccountSetting';
import type { User } from '@/types/User';
import { authClient } from '@/utils/neon';
import { getUserProfile } from '@/utils/userHelper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;

export function useUserProfile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const user = await getUserProfile();

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },
  });

  return {
    user,
    isLoading,
  };
}

export function useUserUpdate(user: User, currentAvatarFile: File | null) {
  const queryClient = useQueryClient();

  const { uploadAvatar, isUploading } = useUploadAvatar(currentAvatarFile);

  const { isPending: isUpdating, mutate: handleUpdate } = useMutation({
    mutationFn: async ({ name }: ProfileUpdate) => {
      let newName = '';
      let newAvatarURL = '';

      if (name !== user.name) {
        newName = name;
      }

      if (!newName && !currentAvatarFile) {
        throw new Error('nothing to update');
      }

      if (currentAvatarFile) {
        const uploadedAvatar = await uploadAvatar();

        newAvatarURL = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${uploadedAvatar.fullPath}`;
      }

      const { data, error } = await authClient.updateUser({
        ...(newName && { name: newName }),
        ...(newAvatarURL && { image: newAvatarURL }),
      });
      if (error) {
        throw error;
      }

      return data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user-profile'],
      });

      toast.success('Profile updated successfully!');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isUpdating,
    handleUpdate,
    isUploading,
  };
}
