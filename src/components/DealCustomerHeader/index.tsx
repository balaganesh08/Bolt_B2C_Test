import React from "react";

const DealCustomerHeader = ({
  customer = {
    name: "Shekhar K. Kumar",
    company: "Sumdha Homes",
    address: "1-8-196/23, road no. 32, gandhi nagar, juparpalli, hyderabad, 501789",
    email: "shekhark@gmail.com",
    phone: "9948932190",
  },
  onChat,
  onAdvance,
  onMenu,
}: {
  customer?: {
    name: string;
    company: string;
    address: string;
    email: string;
    phone: string;
  };
  onChat?: () => void;
  onAdvance?: () => void;
  onMenu?: () => void;
}) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
    <div>
      <div style={{ fontWeight: 600, fontSize: 20 }}>{customer.name}</div>
      <div style={{ color: "#64748b", fontSize: 14 }}>{customer.company}</div>
      <div style={{ color: "#64748b", fontSize: 14 }}>
        {customer.address} &nbsp;
        <a href="#" style={{ color: "#2563eb" }}>Get directions</a> &nbsp;
        <a href={`mailto:${customer.email}`} style={{ color: "#2563eb" }}>{customer.email}</a> &nbsp;
        <a href={`tel:${customer.phone}`} style={{ color: "#2563eb" }}>{customer.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}</a>
      </div>
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      <button
        style={{ border: "1px solid #e2e8f0", borderRadius: 6, padding: "8px 16px", background: "#fff" }}
        onClick={onChat}
      >
        Chat with Customer
      </button>
      <button
        style={{ background: "#2563eb", color: "#fff", borderRadius: 6, padding: "8px 16px", border: "none" }}
        onClick={onAdvance}
      >
        Advance Deal
      </button>
      <button
        style={{ border: "none", background: "transparent", fontSize: 24, cursor: "pointer" }}
        onClick={onMenu}
      >
        ⋮
      </button>
    </div>
  </div>
);

export default DealCustomerHeader;
