<!DOCTYPE html>
<html lang="en">

<head>
  <?php $title="Home" ?>
  <?php include "shared/head-meta.php" ?>
  <?php include "shared/minimal-css.php" ?>
  <link rel="stylesheet" href="assets/css/aos.css">
</head>

<body data-spy="scroll" data-target=".site-navbar-target" data-offset="300" data-aos-easing="slide"
  data-aos-duration="800" data-aos-delay="0">
  <div class="site-wrap">
    <?php include "config/constants-config.php" ?>
    <?php include "shared/header.php" ?>
    <div id="get-started" class="site-blocks-cover overlay aos-init aos-animate"
      style="background-image: url(&quot;assets/images/get_started_bg.jpg&quot;);background-position: 50% -94.9333px;" data-aos="fade"
      data-stellar-background-ratio="0.5">
      <div class="container">
        <div class="row align-items-center justify-content-center text-center">
          <div class="col-md-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="400">
            <div class="row justify-content-center mb-4">
              <div class="col-12 text-center">
                <h1 class="mb-5">Gorgeous place cards for your <span class="typed-words"></span></h1>
                <div>
                  <a data-fancybox="" data-ratio="2" href="templates.php"
                    class="btn btn-primary btn-md"><?php echo $config_toggle_to_design_btn_text?></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="site-section" id="how-to-design" data-aos="fade">
      <div class="container">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-8 text-center">
            <h2 class="text-black h1 site-section-heading text-center">Your Place Card Is Just Three Steps Away</h2>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="p-3 box-with-humber">
              <div class="number-behind">01.</div>
              <h2 class="text-primary">Select Your Favourite Tag</h2>
              <p class="mb-4">With a list of different tags available, simply pick the best tag that suits your needs or tastes then use the
                various customization templates to turn it into a design that’s uniquely yours.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="p-3 box-with-humber">
              <div class="number-behind">02.</div>
              <h2 class="text-primary">Choose your Template</h2>
              <p class="mb-4">From the selection of images ranging from abstract patterns, textures, and flat lay images available, select any image of
                your choice and edit the font and color of your text that you need to use in your template.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="p-3 box-with-humber">
              <div class="number-behind">03.</div>
              <h2 class="text-primary" style="margin-bottom: 13%;">Download Your Pdf</h2>
              <p class="mb-4">Enter your email address to get access to your printable PDF and "voila!" Your done.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section bg-light" id="faq" data-aos="fade">
      <div class="container">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-8 text-center">
            <h2 class="text-black h1 site-section-heading text-center">FAQ</h2>
          </div>
        </div>
      </div>

      <div class="container" id="accordionExample">
        <div class="card rounded-0 border-left-0 border-right-0 border-top-0 border-bottom">
          <div class="card-header border-0 bg-white" id="headingOne" style="cursor:pointer;" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <h6 class="mb-0 font-weight-bold text-primary">What are the editing options provided for my template?</h6>
          </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body py-2">
              Once you have chosen your template, you can edit the font and color of your text upto a maximum of 1000 characters for text.
            </div>
          </div>
        </div>
        <div class="card rounded-0 border-left-0 border-right-0 border-top-0 border-bottom">
          <div class="card-header border-0 bg-white" id="headingTwo" style="cursor:pointer;" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              <h6 class="mb-0 font-weight-bold text-primary">How can I navigate back to a different template while editing my template?</h6>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body py-2">
              You can click on "Select a Design" located on top right corner of the page if you change your mind to use a different template.
            </div>
          </div>
        </div>
        <div class="card rounded-0 border-left-0 border-right-0 border-top-0 border-bottom">
          <div class="card-header border-0 bg-white" id="headingThree" style="cursor:pointer;" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" >
              <h6 class="mb-0 font-weight-bold text-primary">How can I have more customizations and changes in my template?</h6>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body py-2">
              You can always reach out to us at any point of time. To do so, click on "Contact Us" and feel free to share your thoughts.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section pb-0" id="about" data-aos="fade">
      <div class="container">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-12 text-center">
            <h2 class="text-black h1 site-section-heading text-center">About Us</h2>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-md-5 ml-auto mb-5 order-md-2 aos-init">
            <img src="assets/images/about_1.jpg" alt="Image"
              class="img-fluid rounded">
          </div>
          <div class="col-md-6 order-md-1 aos-init">
            <div class="row">
              <div class="col-12">
              </div>
              <div class="col-12 mb-4">
                <p class="lead">Our team focuses on design and developing high quality tags and templates for anyone from individuals
                  to large companies can create amazing visual assets for their brand regardless of technical or artistic skills. We take pride in
                turning complex design and layout themes into easy to customize and download the template for our users. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sticky-footer bg-white text-center py-2 shadow" id="sticky-footer" style="transform:translateY(100%)">
      <div>
        <a data-fancybox="" data-ratio="2" href="templates.php"
          class="btn btn-primary btn-md"><?php echo $config_toggle_to_design_btn_text?></a>
      </div>
    </section>

    <section class="site-section bg-light" id="contact" data-aos="fade">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="text-black h1 site-section-heading">Contact Us</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7 mb-5">
            <form id="contactUsForm" action="#" class="p-5 bg-white">
              <h2 class="h4 text-black mb-5">Contact Form</h2>
              <div class="row form-group">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label class="text-black" for="firstName">First Name <span class="text-danger">*</span></label>
                  <input type="text" id="firstName" name="First Name" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="text-black" for="lastName">Last Name</label>
                  <input type="text" id="lastName" name="Last Name" class="form-control">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12">
                  <label class="text-black" for="email">Email <span class="text-danger">*</span></label>
                  <input type="email" id="email" name="Email" class="form-control" required>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12">
                  <label class="text-black" for="subject">Subject <span class="text-danger">*</span></label>
                  <input type="subject" id="subject" class="form-control" name="Subject" required>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12">
                  <label class="text-black" for="message">Message <span class="text-danger">*</span></label>
                  <textarea name="Message" id="message" required cols="30" rows="7" class="form-control"
                    placeholder="Write your message"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12">
                  <button type="submit" class="btn btn-primary btn-md text-white">Send Message</button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-5">
            <div class="p-4 mb-3 bg-white">
              <p class="mb-0 font-weight-bold">Address</p>
              <p class="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>
              <p class="mb-0 font-weight-bold">Phone</p>
              <p class="mb-4"><a href="#">+1 232 3235 324</a></p>
              <p class="mb-0 font-weight-bold">Email Address</p>
              <p class="mb-0"><a href="#">youremail@domain.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <?php include "shared/footer.php" ?>
  </div>
  <?php include "shared/minimal-js.php" ?>
  <script src="assets/js/aos.js"
    type="text/javascript"></script>
  <script src="assets/js/typed.js"
    type="text/javascript"></script>
    <script src="assets/js/home.js"
    type="text/javascript"></script>
  <script>

  </script>
</body>

</html>
