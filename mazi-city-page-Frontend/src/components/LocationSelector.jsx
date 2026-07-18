/**
 * LocationSelector.jsx
 * Location picker modal
 */

import React, { useState, useEffect } from "react";
import { FiX, FiMapPin, FiSearch } from "react-icons/fi";

const POPULAR_CITIES = [
  "Jintur, Maharashtra",
  "Parbhani, Maharashtra",
  "Nanded, Maharashtra",
  "Latur, Maharashtra",
  "Aurangabad, Maharashtra",
  "Pune, Maharashtra",
];

export default function LocationSelector({
  current,
  onSelect,
  onClose,
}) {

  const [search, setSearch] = useState("");

  // close with ESC key
  useEffect(() => {

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };

  }, [onClose]);


  const filtered = POPULAR_CITIES.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );


  const selectCity = (city) => {
    onSelect(city);
    setSearch("");
  };


  return (

    <div
      className="loc-overlay"
      onMouseDown={onClose}
    >

      <div
        className="loc-modal"
        onMouseDown={(e)=>e.stopPropagation()}
      >


        {/* HEADER */}
        <div className="loc-header">

          <h3>
            Select Location
          </h3>


          <button
            className="loc-close"
            onClick={onClose}
          >
            <FiX size={20}/>
          </button>


        </div>



        {/* SEARCH */}

        <div className="loc-search">

          <FiSearch size={16}/>


          <input

            autoFocus

            type="text"

            placeholder="Search city..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

          />

        </div>




        {/* CITY LIST */}

        <div className="loc-list">


          {
            filtered.length > 0 ? (

              filtered.map(city => (

                <button

                  key={city}

                  className={
                    `loc-item ${
                      city === current ? "active" : ""
                    }`
                  }


                  onClick={()=>selectCity(city)}

                >

                  <FiMapPin size={15}/>

                  {city}


                </button>


              ))

            )

            :

            (

              <p className="no-city">
                No city found
              </p>

            )

          }


        </div>


      </div>



      <style>{`

      .loc-overlay{

        position:fixed;

        inset:0;

        background:rgba(0,0,0,0.45);

        z-index:9999;

        display:flex;

        justify-content:center;

        align-items:flex-start;

        padding-top:80px;

      }



      .loc-modal{

        width:380px;

        max-width:calc(100vw - 30px);

        background:white;

        border-radius:18px;

        overflow:hidden;

        box-shadow:0 20px 60px rgba(0,0,0,.25);

      }



      .loc-header{

        height:62px;

        padding:0 20px;

        display:flex;

        align-items:center;

        justify-content:space-between;

        border-bottom:1px solid #eee;

      }



      .loc-header h3{

        font-size:16px;

        font-weight:700;

      }



      .loc-close{

        width:34px;

        height:34px;

        border-radius:50%;

        border:none;

        background:#f3f4f6;

        cursor:pointer;

        display:flex;

        align-items:center;

        justify-content:center;

      }




      .loc-search{

        height:50px;

        display:flex;

        align-items:center;

        gap:10px;

        padding:0 20px;

        border-bottom:1px solid #eee;

      }



      .loc-search input{

        flex:1;

        border:none;

        outline:none;

        font-size:14px;

      }




      .loc-list{

        max-height:300px;

        overflow-y:auto;

        padding:8px 0;

      }



      .loc-item{

        width:100%;

        display:flex;

        align-items:center;

        gap:12px;

        padding:14px 20px;

        border:none;

        background:white;

        cursor:pointer;

        font-size:14px;

        color:#555;

        text-align:left;

      }



      .loc-item:hover{

        background:#f5f8ff;

        color:#1a73e8;

      }



      .loc-item.active{

        color:#1a73e8;

        font-weight:600;

      }



      .no-city{

        padding:20px;

        text-align:center;

        color:#777;

      }



      `}</style>


    </div>

  );

}