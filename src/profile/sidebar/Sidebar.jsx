import React from 'react';
import ActivityHistory from '../../common/account/ActivityHistory';
import IdentityInfo from '../../common/account/IdentityInfo';
import TopCollaborators from '../../common/account/TopCollaborators';

const Sidebar = props => {

  return (
    <div className="sidebar"> 
      <div className="section identity">
        <IdentityInfo account={props.account} />
      </div>

      { props.me && props.me.feature_toggles && props.me.feature_toggles.includes("send-message") &&
        <div className="section send-message">
          <button className="btn" onClick={props.onSendMessage}>
            <span className="icon">&#xf0e0;</span>
            <span className="label">Send Message</span>
          </button>
        </div>
      }

      <ActivityHistory 
        className="section" 
        width={237}
        height={55}
        fill="#4483c4"
        stats={props.account && props.account.stats} />

      <TopCollaborators 
        className="section collaborators"
        title="Top collaborators"
        username={props.account && props.account.username} />
    </div>
  );

}

export default Sidebar;