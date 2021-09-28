import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const FollowHandler = (idToFollow) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))
    //si on suit la personne le setIsFollowed doit être sur true
    //avec ça le bouton va changer aussi
    setIsFollowed(true)
    
  };

  const handleUnfollow = () => {};

  useEffect(() => {
    //on doit attendre que userData arrive pour lancer useEffect
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
    // quand on a le userData on relance le useEffect
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        //si click on ne suit plus
        <span onClick={handleUnfollow}>
          <button className="unfollow-btn">Abonné</button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        //si click on suit
        <span onClick={handleFollow}>
          <button className="follow-btn">Suivre</button>
        </span>
      )}
    </>
  );
};

export default FollowHandler;
