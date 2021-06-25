import react from 'react'
import { useAlert } from 'react-alert'

const Profile=()=>{
    const alert = useAlert()
    return (
        <div class="container emp-profile">
            <div class="row">
                <div class="col-md-4">
                    <div class="profile-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmv_L2aK6sptS6tEzgWGlPT2Ae9RjRaVRkA&usqp=CAU" alt=""/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="profile-head">
                                <h5>
                                    Ravindra
                                </h5>
                                <h6>
                                   Painter
                                </h6>
                                <p class="proile-rating">RATINGS : <span>4.6/5</span></p>

                               
                                <div class="row">
                                <div class="col-md-12">
                                   <div class="stars">
                                    <input class="star star-5" id="star-5" type="radio" name="star" /> 
                                    <label class="star star-5" for="star-5"></label>
                                     <input class="star star-4" id="star-4" type="radio" name="star" /> 
                                     <label class="star star-4" for="star-4"></label>
                                      <input class="star star-3" id="star-3" type="radio" name="star" /> 
                                      <label class="star star-3" for="star-3"></label> 
                                      <input class="star star-2" id="star-2" type="radio" name="star" />
                                       <label class="star star-2" for="star-2"></label>
                                        <input class="star star-1" id="star-1" type="radio" name="star" /> 
                                        <label class="star star-1" for="star-1"></label> 
                                        <button class="btn btn-success" onClick={() => {
        alert.success('Thank you for rating :) ')
      }}>Submit</button>
                                </div>
                             </div>
                         </div>
                       </div>
                       
                    
                </div>
                {/* <div class="col-md-2">
                    <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                </div> */}
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Kshiti123</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Kshiti Ghelani</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>kshitighelani@gmail.com</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>123 456 7890</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Painting</p>
                                        </div>
                                    </div>
                        </div>
                     
                    </div>
                </div>
            </div>
                
    </div>
        );
};

export default Profile;