import { json } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import toastifyCSS from "react-toastify/dist/ReactToastify.css";
import {
  isRouteErrorResponse,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
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
import { getRootUser, getUserFromSession } from "./utils/database/auth.server";
import { getTechnologies } from "./utils/database/technology.server";
import { getProjects } from "./utils/database/project.server";
import PageContextProvider from "./store/page-context";
import { ToastContainer } from "react-toastify";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Minh Hoang Tran Portfolio",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const matches = useMatches();
  const firstContainerPathPattern = matches[2];
  const inProjectDetail =
    firstContainerPathPattern.id === "routes/__app/my-project/$projectId/index";
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className={`min-h-screen bg-slate-50 flex flex-col ${
          inProjectDetail ? "endless-river" : "shore"
        } `}
      >
        <div id="modal-hook"></div>
        <ToastContainer />
        <PageContextProvider>
          <NavBar />
          <Outlet />
        </PageContextProvider>
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
    { rel: "stylesheet", href: toastifyCSS },
  ];
};

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-slate-50 flex flex-col">
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
      <body className="min-h-screen bg-slate-50 flex flex-col">
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
export const loader: LoaderFunction = async ({ request }) => {
  let rootUser;
  try {
    rootUser = await getRootUser();
  } catch (error) {
    rootUser = null;
  }

  let user;
  try {
    user = await getUserFromSession(request);
  } catch (error) {
    user = null;
  }
  let technologies: any = [];
  try {
    technologies = await getTechnologies();
  } catch (error) {
    technologies = [];
  }

  let projects: any = [];
  try {
    projects = await getProjects();
  } catch (error) {
    projects = [];
  }

  return json({ rootUser, userData: user, technologies, projects });
};
