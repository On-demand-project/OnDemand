import react, { Component } from 'react'
import * as emailjs from 'emailjs-com'
import { Redirect } from 'react-router'

class Contact extends Component {
    state = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

  handleSubmit(e) {
      e.preventDefault()

      const { name, email, phone, message } = this.state

      let templateParams = {
        from_name: email,
        to_name: 'demandon2021@gmail.com',
        subject: 'Contact-ondemand',
        message_html: message,
       }

       emailjs.send(
        'service_27vvpe3',
        'template_s1lkq7z',
         templateParams,
        'user_hkFUloAWi8C6jgMGjzZt9'
       )
       this.resetForm()
   }
  resetForm() {
      this.setState({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
      Redirect('/');
    }
  handleChange = (param, e) => {
      this.setState({ [param]: e.target.value })
    }
  render() {
      return (
<body class="main-layout">


<div class="brand_color">
  <div class="container">
      <div class="row">
          <div class="col-md-12">
              <div class="titlepage">
                  <h2>Contact Us</h2>
              </div>
          </div>
      </div>
  </div>

</div>

<div class="contact">
  <div class="container">
      <div class="row">
          <div class="col-md-12">

              <form class="main_form" onSubmit={this.handleSubmit.bind(this)}>
                  <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                          <input class="form-control" placeholder="Your name" type="text" name="name"  value={this.state.name} onChange={this.handleChange.bind(this, 'name')} required/>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                          <input class="form-control" placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} required/>
                      </div>
                      
                      <div class=" col-md-12">
                          <input class="form-control" placeholder="Phone(Optional)" type="text" name="phone" value={this.state.phone}
                onChange={this.handleChange.bind(this, 'phone')}/>
                      </div>
                      
                      <div class="col-md-12">
                          <textarea class="textarea" placeholder="Message" name="message"  value={this.state.message}
                onChange={this.handleChange.bind(this, 'message')} required></textarea>
                      </div>
                      <div class=" col-md-12">
                          <button class="send" type="submit">Send</button>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  </div>
</div>
</body>);
}}

export default Contact;