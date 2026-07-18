import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiPlusCircle,
  FiGrid,
  FiUser,
} from "react-icons/fi";

export default function BottomNavbar() {
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome size={22} />,
    },
    {
      name: "Search",
      path: "/shops",
      icon: <FiSearch size={22} />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FiGrid size={22} />,
    },
    {
      name: "Profile",
      path: "/login",
      icon: <FiUser size={22} />,
    },
  ];

  return (
    <nav className="bottom-nav">

      {navItems.slice(0, 2).map((item) => (
        <BottomItem key={item.name} {...item} />
      ))}


      <NavLink
        to="/register"
        className="bottom-add"
        aria-label="Add Shop"
      >
        <FiPlusCircle size={30} />
      </NavLink>


      {navItems.slice(2).map((item) => (
        <BottomItem key={item.name} {...item} />
      ))}


      <style>{`

        .bottom-nav {
          display:none;
        }


        @media(max-width:768px){

          .bottom-nav {

            position:fixed;
            bottom:0;
            left:0;
            right:0;

            height:68px;

            background:#ffffff;

            border-top:1px solid #e5e7eb;

            display:flex;
            align-items:center;
            justify-content:space-around;

            z-index:999;

            padding:0 8px;

          }



          .bottom-item {

            flex:1;

            display:flex;
            flex-direction:column;

            align-items:center;
            justify-content:center;

            gap:4px;

            text-decoration:none;

            color:#6b7280;

            font-size:12px;

            transition:all .2s ease;

          }



          .bottom-item svg {

            transition:.2s;

          }



          .bottom-item.active {

            color:#1a73e8;

            font-weight:600;

          }



          .bottom-item.active svg {

            transform:translateY(-2px);

          }



          .bottom-add {


            width:58px;

            height:58px;


            border-radius:50%;


            background:#1a73e8;


            color:white;


            display:flex;


            align-items:center;


            justify-content:center;


            margin-top:-32px;


            flex-shrink:0;


            text-decoration:none;


            box-shadow:0 8px 25px rgba(26,115,232,.35);


            transition:.25s;


          }



          .bottom-add:hover {

            transform:translateY(-3px);

          }



        }


      `}</style>

    </nav>
  );
}



function BottomItem({ path, name, icon }) {

  return (

    <NavLink
      to={path}
      className={({isActive}) =>
        isActive
        ? "bottom-item active"
        : "bottom-item"
      }
    >

      {icon}

      <span>
        {name}
      </span>

    </NavLink>

  );
}