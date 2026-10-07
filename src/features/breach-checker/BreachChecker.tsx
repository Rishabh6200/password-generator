import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import {
  BreachInput,
  BreachResultBanner,
  CrackTimeEstimates,
  KAnonymityExplainer,
} from './components';
import { checkPasswordBreach, estimateCrackTimes } from './utils/hibp';
import type { BreachCheckResult, CheckStatus, CrackTimeEstimate } from './types';

interface BreachCheckerProps {
  initialPassword?: string;
}

export function BreachChecker({ initialPassword = '' }: BreachCheckerProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const statePassword = (location.state as { password?: string } | null)?.password;
  const paramPassword = searchParams.get('pwd');
  const incomingPassword = statePassword || paramPassword || initialPassword;

  const [password, setPassword] = useState(incomingPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<CheckStatus>('idle');
  const [result, setResult] = useState<BreachCheckResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [crackTimes, setCrackTimes] = useState<CrackTimeEstimate[]>([]);

  const handleCheck = useCallback(async (customPwd?: string) => {
    const pwdToCheck = customPwd !== undefined ? customPwd : password;
    if (!pwdToCheck.trim()) return;

    setStatus('checking');
    setErrorMsg(null);

    try {
      const res = await checkPasswordBreach(pwdToCheck);
      setResult(res);
      setCrackTimes(estimateCrackTimes(pwdToCheck));
      setStatus(res.isPwned ? 'pwned' : 'safe');
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Network error checking breach database');
    }
  }, [password]);

  const lastAuditedRef = useRef<string | null>(null);

  useEffect(() => {
    if (incomingPassword && lastAuditedRef.current !== incomingPassword) {
      lastAuditedRef.current = incomingPassword;
      setPassword(incomingPassword);
      handleCheck(incomingPassword);
    }
  }, [incomingPassword, handleCheck]);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setStatus('idle');
    setResult(null);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setPassword(text);
      }
    } catch {
      // Clipboard access denied or unsupported
    }
  }, []);

  const handleClear = useCallback(() => {
    setPassword('');
    setStatus('idle');
    setResult(null);
    setErrorMsg(null);
    setCrackTimes([]);
  }, []);

  return (
    <div className="w-full rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-5 sm:p-8 shadow-xl shadow-black/3 dark:shadow-black/50 ring-1 ring-black/4 dark:ring-white/6 flex flex-col gap-7">
      <BreachInput
        password={password}
        showPassword={showPassword}
        status={status}
        onChangePassword={handlePasswordChange}
        onToggleShowPassword={() => setShowPassword((prev) => !prev)}
        onPaste={handlePaste}
        onClear={handleClear}
        onCheck={() => handleCheck()}
      />

      <BreachResultBanner
        status={status}
        result={result}
        errorMsg={errorMsg}
      />

      <CrackTimeEstimates
        crackTimes={crackTimes}
      />

      <KAnonymityExplainer />
    </div>
  );
}
