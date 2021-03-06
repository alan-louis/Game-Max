import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
// import star from "../img/star.png";
import exemple from "../../img/0125.png";
import { getTrends } from "../../actions/post.actions";
// import { NavLink } from "react-router-dom";
import Modal from "../Modals";

const Trends = ({posts,userData,usersData}) => {
  // const posts = useSelector((state) => state.allPostsReducer);
  // const usersData = useSelector((state) => state.usersReducer);
  // const userData = useSelector((state) => state.userReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const [trendPost, setTrendPost] = useState('')
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false)

  //si on prends les props, seul userdata est un objet les deux autres sont des array
  // pareil quand je fais les reducer ici wtf?
  {console.log("userdata est sensé etre un array:")}
  {console.log(userData)}
  {console.log("userSdata est sensé etre un array:")}
  {console.log(usersData)}
  {console.log("posts est sensé etre un array:")}
  {console.log(posts)}
  

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });

      sortedArray.length = 3;
      console.log(sortedArray);
      dispatch(getTrends(sortedArray));
    }
  }, [posts]);


  const showModal = id => {
    setOpenModal(true);
    setTrendPost(id)



  }

  const hideModal = () => {
    setOpenModal(false);
  }

  return (
    <>
      <div className="trends">
        <div className="eventBlock">
          <b>Prochain évènement</b>
          <div className="eventBlockText">
            <div>Soirée d'information gamemax</div>
            <div>15/10/2021</div>
          </div>
          <img className="favoriteEventBanner" src={exemple} />
        </div>
        <div className="favoriteBlock">
          <b>Favoris</b>
          <div className="trending-container">
        
        
          <ul>
            {trendList.length &&
              trendList.map((post) => {
                return (
                
                  <li key={post._id}>
                    <div>
                      {post.picture && (
                        <img src={post.picture} alt="post-pic" />
                      )}
                      {post.video && (
                        <iframe
                          src={post.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={post._id}
                        ></iframe>
                      )}
                      {isEmpty(post.picture) && isEmpty(post.video) && (
                          <img src={usersData !== isEmpty && usersData.map((user)=>{
                              if(user._id === post.posterId) {
                                  return user.picture;
                              } else return null;
                          })
                          .join("")
                        } alt="profile-pic" />
                      )}
                    </div>
                    <div className="trend-content">
                        <p>{post.message}</p>
                        <span onClick={() => showModal(post.postId)}>lire</span>
                    </div>
                  </li>
                  
                );
              })}
          </ul>
        
          
      </div>
        </div>
      </div>
          <>
      <div>
      <Modal showModal={openModal} hideModal={hideModal}>
                <div className="modal-header">
                  <h2>Titre </h2>
                </div>
                <div className="modal-pic">
                {/* {post.picture && (
                        <img src={post.picture} alt="post-pic" />
                      )}
                      {post.video && (
                        <iframe
                          src={post.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={post._id}
                        ></iframe>
                      )} */}
                </div>
                <div className="modal-body">
                  <h3>Message</h3>
                </div>
                <div className="modal-footer">
                  <button className="modal-btn">Fermer</button>
                </div>
          </Modal>
          </div>
        
          </>
        
    </>
  );
};

export default Trends;
