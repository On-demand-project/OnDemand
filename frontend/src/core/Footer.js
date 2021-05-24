import react from 'react'

const Footer=()=>{
return(<footr>
         <div className="footer">
            <div class="container">
            <div class="row">
               <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <div class="contact">
                     <h3>conatct us</h3>
                     <span>Nitte Meenakshi Institute of Technology<br/>
                       Bangalore,India,560064 <br/>
                        +91 8277113344<br/>+91 7899447930</span>
                  </div>
               </div>
                 <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <div class="contact">
                     <h3>ADDITIONAL LINKS</h3>
                     <ul class="lik">
                         <li> <a href="About">About us</a></li>
                         <li> <a href="#">Terms and conditions</a></li>
                         <li> <a href="#">Privacy policy</a></li>
                          <li> <a href="Contact">Contact us</a></li>
                     </ul>
                  </div>
               </div>
               <div className="count">
         <div className="counter-container">
         <i className="fa fa-twitter fa-3x"></i>
               <div className="counter" data-target="12000"></div>
                <span>Twitter . </span>
               </div>

             <div className="counter-container">
              <i className="fa fa-youtube fa-3x"></i>
              <div className="counter" data-target="5000"></div>
                 <span>YouTube . </span>
              </div>

            <div className="counter-container">
            <i className="fa fa-facebook fa-3x"></i>
               <div className="counter" data-target="7500"></div>
               <span>Facebook </span>
            </div>
            </div>
            </div>
         </div>
            <div class="copyright">
               <p>Copyright 2021 All Right Reserved By On-Demand</p>
            </div>
         
      </div>
      </footr>);
      }

      export default Footer;