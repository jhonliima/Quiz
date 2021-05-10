import React from "react";
import "../assets/loading.css";
export default function Loading() {
  return (
    <div className='containerLoading'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
