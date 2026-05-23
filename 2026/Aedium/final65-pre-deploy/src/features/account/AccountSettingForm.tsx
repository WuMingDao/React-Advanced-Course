import { useChangeAvatar, useUploadAvatar } from '../article/userAvatar';
import { useUserUpdate } from '@/hooks/userProfile';
import { profileUpdateSchema } from '@/schemas/AccountSetting';
import type { User } from '@/types/User';
import Avatar from '@/ui/Avatar';
import { FieldInfo } from '@/ui/FieldInfo';
import { useForm, useStore } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';

function AccountSettingForm({ user }: { user: User }) {
  const { avatarURL, currentAvatarFile, handleImageChange } =
    useChangeAvatar(user);

  const { handleUpdate, isUpdating, isUploading } = useUserUpdate(
    user,
    currentAvatarFile,
  );

  useUploadAvatar(currentAvatarFile);

  const form = useForm({
    validators: {
      onBlur: profileUpdateSchema,
    },

    defaultValues: {
      name: user.name || '',
    },
    onSubmit: ({ value: { name } }) => {
      handleUpdate({ name });
    },
  });

  const name = useStore(form.store, (state) => state.values.name);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label htmlFor="avatar" className="mx-auto cursor-pointer">
          <Avatar avatarURL={avatarURL} username={name} />
        </label>

        <input
          className="hidden"
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <label className="label">
          Email
          {!user?.emailVerified && (
            <Link className="link link-error" to="/auth/verify-email">
              (need to verify)
            </Link>
          )}
        </label>
        <input
          type="text"
          disabled
          className="input"
          placeholder="My awesome page"
          value={user?.email}
        />

        <label className="label">Username</label>
        <form.Field
          name="name"
          children={(field) => (
            <>
              <input
                className="input"
                placeholder="Your username"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isUpdating}
                maxLength={20}
              />
              <FieldInfo field={field} />
            </>
          )}
        />

        <Link className="link link-secondary text-right" to="/account/security">
          reset password
        </Link>

        <button className="btn btn-primary" disabled={isUpdating}>
          {isUpdating && isUploading && (
            <span className="loading loading-spinner"></span>
          )}
          {!isUpdating && !isUploading && 'Update'}
        </button>
      </fieldset>
    </form>
  );
}

export default AccountSettingForm;
