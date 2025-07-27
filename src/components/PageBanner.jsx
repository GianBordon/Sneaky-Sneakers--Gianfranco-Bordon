import React from "react";

const PageBanner = ({ title, subtitle, bgColor = "bg-black", textColor = "text-white" }) => (
  <section className={`banner ${bgColor} ${textColor} py-8 text-center`}>
    <h1 className="text-4xl font-bold">{title}</h1>
    {subtitle && <p className="text-xl mt-2">{subtitle}</p>}
  </section>
);

export default PageBanner; 