import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ErrorFeedback = ({ message }: { message: string }) => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorFeedback;
