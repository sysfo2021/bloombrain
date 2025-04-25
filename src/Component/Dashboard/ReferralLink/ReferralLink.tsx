import React, { useState } from "react";

const ReferralLink = () => {
  const [activeTab, setActiveTab] = useState("left");
  const [RefLink, setRefLink] = useState(localStorage.getItem("refURL") as string)
  const leftReferralLink = "https://primeorbitai.com/referral-left?code=LEFT123";
  const rightReferralLink = "https://primeorbitai.com/referral-right?code=RIGHT456";

  const copyToClipboard = (link:any) => {
    navigator.clipboard.writeText(link);
    alert("Referral link copied!");
  };

  return (
    <div className="referral-tab">
      <div className="tab-buttons">
        <button className={activeTab === "left" ? "active" : ""} onClick={() => setActiveTab("left")}>
          Left Referral
        </button>
        <button className={activeTab === "right" ? "active" : ""} onClick={() => setActiveTab("right")}>
          Right Referral
        </button>
      </div>
      <div className="tab-content">
        <input
          type="text"
          value={activeTab === "left" ? RefLink+'&leg=1' : RefLink+'&leg=2'}
          readOnly
          className="referral-input"
        />
        <button className="copy-btn" onClick={() => copyToClipboard(activeTab === "left" ? RefLink+'&leg=1' : RefLink+'&leg=2')}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default ReferralLink;
