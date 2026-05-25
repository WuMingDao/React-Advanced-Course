import {
  useResendCountDown,
  useSendVerificationEmail,
  useVerifyEmailCode,
} from './verificationEmail';
import { emailVerifySchema } from '@/schemas/EmailVerify';
import { FieldInfo } from '@/ui/FieldInfo';
import RequireNotVerifiedEmail from '@/ui/RequireNotVerifiedEmail';
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@neondatabase/neon-js/auth/react';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';

function EmailVerifyForm() {
  const navigate = useNavigate();

  const { resendTimer, setResendTimer } = useResendCountDown();

  const { sendVerificationEmail, isPending: isSending } =
    useSendVerificationEmail(setResendTimer);

  const { verifyEmailCode, isVerifying } = useVerifyEmailCode();

  const form = useForm({
    defaultValues: {
      code: '',
    },

    validators: {
      onBlur: emailVerifySchema,
    },

    onSubmit: ({ value: { code } }) => {
      verifyEmailCode(
        { code },
        {
          onSuccess: (data) => {
            if (data.user) {
              navigate({ to: '/' });
            } else {
              navigate({
                to: '/auth/$pathname',
                params: { pathname: 'sign-in' },
              });
            }
          },
        },
      );
    },
  });

  return (
    <>
      <SignedIn>
        <RequireNotVerifiedEmail>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex min-h-screen items-center justify-center"
          >
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <h2 className="mb-4 text-center text-4xl">Email Verification</h2>

              <form.Field
                name="code"
                children={(field) => (
                  <>
                    <label className="label">Verification Code</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="input"
                      placeholder="Your Code"
                      maxLength={6}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <FieldInfo field={field} />
                  </>
                )}
              />

              <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={isVerifying}
              >
                Verify
              </button>
              <button
                type="submit"
                className="btn btn-secondary mt-4"
                onClick={() => {
                  sendVerificationEmail();
                  setResendTimer(60);
                }}
                disabled={isSending || resendTimer > 0}
              >
                Resend Verification Email
                {resendTimer > 0 && <span>({resendTimer})</span>}
              </button>
            </fieldset>
          </form>
        </RequireNotVerifiedEmail>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default EmailVerifyForm;
