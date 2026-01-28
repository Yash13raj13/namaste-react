import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  let title = "Oops!";
  let message = "Something went wrong.";
  let status = "";

  if (isRouteErrorResponse(error)) {
    status = `${error.status} : ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
      <h1 className="text-5xl font-bold text-red-600">{title}</h1>

      <h2 className="text-xl text-gray-700">{message}</h2>

      {status && <h3 className="text-gray-500">{status}</h3>}

      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Error;
