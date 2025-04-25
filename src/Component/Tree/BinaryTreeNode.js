import React from "react";
import { dynamicImage } from "../../Service";
import { LuPlus } from "react-icons/lu";
// const fakeUser = {
//   id: "null",
//   username: "Null",
//   left_child_id: null,
//   right_child_id: null,
//   image: "https://i.imgur.com/AFj9jns.png"
// };
export default class BinaryTreeNode extends React.Component {
  render() {
    const {
      user,
      allUsers,
      // fakeUser = [],
      deep,
      maxDeep = 4,
      renderDetail,
      renderNode,
      onClick,
      colorText = "#333",
      imageFake = dynamicImage('plus.png'),
      nameFake = "Blank"
    } = this.props;
    const fakeUser = {
      id: "null",
      username: nameFake,
      left_child_id: null,
      right_child_id: null,
      image: imageFake
    };
    let leftChild = allUsers.find(item => item.id === user.left_child_id);
    if (!leftChild) {
      leftChild = fakeUser;
    }
    let rightChild = allUsers.find(item => item.id === user.right_child_id);
    if (!rightChild) {
      rightChild = fakeUser;
    }
    return (
      <li>
        {colorText && (
          <a onClick={() => {
              onClick && onClick(user.id);
            }}
            href="javascript:void(0)"
          >
            {renderNode ? (
              renderNode(user)
            ) : (
              <div className="distributor-wrap">
                <div className="avatar">
                  <img src={user.image} />
                </div>
                <span className="name text_yellow" style={{ color: colorText }}>
                  {user.username}
                </span>
              </div>
            )}
            <div className="distributor-details">
              {renderDetail ? (
                renderDetail(user)
              ) : (
                <div className="details-wrap">
                  <div className="details-title">Member Details </div>
                  <div className="details-row">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="label">{'Member Name'}</div>
                      <div className="value">{user.username}</div>
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="label">{'Sponsor Name'}</div>
                      <div className="value">{user?.description?.Sponsor}</div>
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="label">{'Joining Date'}</div>
                      <div className="value">{user?.description?.Reg_Date}</div>
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="label">{'Bot Status'}</div>
                      <div className="value">{user?.description?.Bot_Status}</div>
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="label">{'Bot Activation Date'}</div>
                      <div className="value">{user?.description?.Bot_Activation_Date}</div>
                    </div>
                  </div>
                  <div className="details-title"> </div>
                  <div className="details-row border-top-2" style={{ background: "none", gap: "10", justifyContent: "space-between", padding: "0", flexWrap: "wrap" }}>
                    <div className="d-flex align-items-center justify-content-between" style={{ background: "rgba(59, 59, 59, 0.68)", width: "49%", padding: "1px 4px", marginBottom: "3px" }}>
                      <div className="label">{'Total Left Bot'}</div>
                      <div className="value">{user?.description?.totalleftTeamCount}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between"  style={{ background: "rgba(59, 59, 59, 0.68)", width: "49%", padding: "1px 4px", marginBottom: "3px" }}>
                      <div className="label">{'Total Right Bot'}</div>
                      <div className="value">{user?.description?.totalRightTeamCount}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between"  style={{ background: "rgba(59, 59, 59, 0.68)", width: "49%", padding: "1px 4px", marginBottom: "3px" }}>
                      <div className="label">{'Current Left Bot'}</div>
                      <div className="value">{user?.description?.leftTeamCount}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between" style={{ background: "rgba(59, 59, 59, 0.68)", width: "49%", padding: "1px 4px", marginBottom: "3px" }}>
                      <div className="label">{'Current Right Bot'}</div>
                      <div className="value">{user?.description?.rightTeamCount}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between" style={{ background: "rgba(59, 59, 59, 0.68)", width: "49%", padding: "1px 4px", marginBottom: "3px" }}>
                      <div className="label">{'Remaining Left Bot'}</div>
                      <div className="value">{user?.description?.leftRemainingTeamCount}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between" style={{ background: "rgba(59, 59, 59, 0.68)", width: "49%", padding: "1px 4px", marginBottom: "3px" }}>
                      <div className="label">{'Remaining Right Bot'}</div>
                      <div className="value">{user?.description?.rightRemaining}</div>
                    </div>
                  </div>
                </div>
              )}
              <div className="horizontal-line" />{" "}
              <div className="sloping-line" />
            </div>
          </a>
        )}

        {deep < maxDeep && (
          <ul>
            <BinaryTreeNode
              deep={deep + 1}
              maxDeep={maxDeep}
              allUsers={allUsers}
              user={leftChild}
              renderDetail={renderDetail}
              renderNode={renderNode}
              onClick={onClick}
              colorText={colorText}
              imageFake={imageFake}
              nameFake={nameFake}
            />
            <BinaryTreeNode
              deep={deep + 1}
              maxDeep={maxDeep}
              allUsers={allUsers}
              renderDetail={renderDetail}
              renderNode={renderNode}
              user={rightChild}
              onClick={onClick}
              colorText={colorText}
              imageFake={imageFake}
              nameFake={nameFake}
            />
          </ul>
        )}
      </li>
    );
  }
}