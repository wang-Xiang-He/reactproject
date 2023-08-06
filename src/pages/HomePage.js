import React, { useState, useEffect,useContext } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Users from "./Users";
import Charts from "./Charts";
import Reports from "./Reports";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import { AuthContext } from '../AuthContext';


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />
        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};


const PrivateRouteWithLoader = ({ component: Component, ...rest }) => {
  const {  isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Preloader show={! isAuthenticated} /> {/* 未登錄時顯示 Preloader */}
          { isAuthenticated ? (
            <Component {...props} /> 
          ) : (
            <Redirect to="/login" /> 
          )}
        </>
      )}
    />
  );
};

const PrivateRouteWithSidebar = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Preloader show={false} /> {/* 如果要保留Preloader，將show值設為false */}
            <Sidebar /> {/* 加入Sidebar */}
            <main className="content">
              <Navbar /> {/* 加入Navbar */}
              <Component {...props} /> {/* 加入Component */}
              <Footer /> {/* 加入Footer */}
            </main>
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};




export default () => (
  <Switch>
    {/* <PrivateRouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.login.path} component={Signin} />
    {/* <Route exact path={Routes.login.path} component={Signin} /> */}
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
    <PrivateRouteWithLoader exact path={Routes.Lock.path} component={Lock} />

    {/* pages */}
    <PrivateRouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <PrivateRouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <PrivateRouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <PrivateRouteWithSidebar exact path={Routes.Users.path} component={Users} />
    <PrivateRouteWithSidebar exact path={Routes.Charts.path} component={Charts} />
    <PrivateRouteWithSidebar exact path={Routes.Reports.path} component={Reports} />
    <PrivateRouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <PrivateRouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

    {/* components */}
    <PrivateRouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <PrivateRouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <PrivateRouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <PrivateRouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <PrivateRouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <PrivateRouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <PrivateRouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <PrivateRouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <PrivateRouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <PrivateRouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <PrivateRouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <PrivateRouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <PrivateRouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <PrivateRouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <PrivateRouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <PrivateRouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <PrivateRouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
    <PrivateRouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
    <PrivateRouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
    <PrivateRouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
    <PrivateRouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
    <PrivateRouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <PrivateRouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
