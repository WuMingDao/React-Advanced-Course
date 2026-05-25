const avatarSizes = {
  sm: 'sm:w-15',
  md: 'sm:w-20',
};

function Avatar({
  avatarURL = '',
  username,
  size = 'md',
  className = 'w-15',
}: {
  avatarURL?: string;
  username: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div className={`avatar ${avatarURL ? '' : 'avatar-placeholder'}`}>
      <div
        className={`ring-primary ring-offset-base-100 ${avatarSizes[size]} rounded-full ring-2 ring-offset-2 ${className}`}
      >
        {avatarURL && <img src={avatarURL} />}
        {!avatarURL && (
          <span className="text-xl uppercase">{username.slice(0, 2)}</span>
        )}
      </div>
    </div>
  );
}

export default Avatar;
