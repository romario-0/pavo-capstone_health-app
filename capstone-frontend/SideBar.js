import React, { Component } from "react";

export default class SideBar extends Component {
  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="img/user2-160x160.jpg"
                className="img-circle"
                alt="User Image"
              />
            </div>
            <div className="pull-left info">
              <p>User Name</p>
              <a href="#">
                <i className="fa fa-circle text-success"></i> Online
              </a>
            </div>
          </div>
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input
                type="text"
                name="q"
                className="form-control"
                placeholder="Search..."
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  name="search"
                  id="search-btn"
                  className="btn btn-flat"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN GOAL</li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-files-o"></i>
                <span>Layout Options</span>
                <span className="pull-right-container">
                  <span className="label label-primary pull-right">4</span>
                </span>
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="pages/layout/top-nav.html">
                    <i className="fa fa-circle-o"></i> Diet Chart
                  </a>
                </li>
                <li>
                  <a href="pages/layout/boxed.html">
                    <i className="fa fa-circle-o"></i> PAYED PLAN
                  </a>
                </li>
                <li>
                  <a href="pages/layout/fixed.html">
                    <i className="fa fa-circle-o"></i> Fixed ROUTINE
                  </a>
                </li>
                <li>
                  <a href="pages/layout/collapsed-sidebar.html">
                    <i className="fa fa-circle-o"></i> Collapsed Sidebar
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="pages/widgets.html">
                <i className="fa fa-th"></i> <span>HELP</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-green">new</small>
                </span>
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-pie-chart"></i>
                <span>Charts DIET</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="pages/charts/chartjs.html">
                    <i className="fa fa-circle-o"></i> DAILY GOAL
                  </a>
                </li>
                <li>
                  <a href="pages/charts/morris.html">
                    <i className="fa fa-circle-o"></i> EXCERCISES
                  </a>
                </li>
                <li>
                  <a href="pages/charts/flot.html">
                    <i className="fa fa-circle-o"></i> PLAN
                  </a>
                </li>
                <li>
                  <a href="pages/charts/inline.html">
                    <i className="fa fa-circle-o"></i> DIET charts
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <ul className="treeview-menu">
                <li>
                  <a href="pages/tables/simple.html">
                    <i className="fa fa-circle-o"></i> EXCERCISE tables
                  </a>
                </li>
                <li>
                  <a href="pages/tables/data.html">
                    <i className="fa fa-circle-o"></i> FOOD tables
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="pages/calendar.html">
                <i className="fa fa-calendar"></i> <span>Calendar</span>
                <span className="pull-right-container">
                  {" "}
                  <small className="label pull-right bg-red">3</small>
                  <small className="label pull-right bg-blue">17</small>
                </span>
              </a>
            </li>
            <li>
              <a href="pages/mailbox/mailbox.html">
                <i className="fa fa-envelope"></i> <span>Mailbox</span>
                <span className="pull-right-container">
                  <small className="label pull-right bg-yellow">12</small>
                  <small className="label pull-right bg-green">16</small>
                  <small className="label pull-right bg-red">5</small>
                </span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}
