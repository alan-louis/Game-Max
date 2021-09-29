import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser2, isEmpty } from "../Utils";
import FollowHandler from "../profil/FollowHandler";
import FavoriteButton from "./FavoriteButton";

const Card = ({ post }) => {
  //on appelle post en props
  console.log(post);
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={usersData
                .map((user) => {
                  if (user._id === post.posterId) return user.picture;
                  else return null;
                })
                .join("")}
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {" "}
                  {usersData.map((user) => {
                    if (user._id === post.posterId) return user.pseudo;
                    else return null;
                  })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser2(post.createdAt)}</span>
            </div>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            <p>{post.message}</p>
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment" />
                <span>{post.comments.length}</span>
              </div>
              <FavoriteButton post={post} />
              <h6>gestion comments</h6>
            </div>
            
          </div>
        </>
      )}
    </li>
  );
};

export default Card;