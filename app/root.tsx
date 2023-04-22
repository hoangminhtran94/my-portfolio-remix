import type { MetaFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { LoaderFunction, ErrorBoundaryComponent } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/react/dist/routeModules";
import NavBar from "./components/UI/Navbar/NavBar";
import appStyles from "~/styles/app.css";
import Footer from "./components/UI/Footer/Footer";
import { getUserFromSession } from "./utils/database/auth.server";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Montserrat",
    },
    { rel: "stylesheet", href: stylesheet },
    { rel: "stylesheet", href: appStyles },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    return await getUserFromSession(request);
  } catch (error) {
    return error;
  }
};

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <main className="h-[80vh] flex flex-col items-center justify-center">
          <h2 className="text-center">Error happened</h2>
          <h3 className="text-center">
            {caught.data.error ? caught.data.error : "Unknown error"}
          </h3>
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  let errorBody;
  if (isRouteErrorResponse(error)) {
    errorBody = error.data;
  } else if (error instanceof Error) {
    errorBody = error.message;
  } else {
    errorBody = "Unknow error";
  }
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <main className="h-[80vh] flex flex-col items-center justify-center">
          <h2 className="text-center">Error happened</h2>
          <h3 className="text-center">{errorBody}</h3>
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
