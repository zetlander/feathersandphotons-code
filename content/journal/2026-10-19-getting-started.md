{
"draft": false,
  "date": "2026-10-19",
  "title": "Getting started",
  "summary": "Building a website.  List of Astro hardware and software"
}
### Website Construction

The Domain Name featherandphotons.com was acquired from Porkbun. Their service is transparent, simple and cheap. I asked Gemini for suggestions on a domain name and this one popped up. 

This website was built using Claude Opus 5.5 to build a site hosted on Netlify.  The process of "vibe coding" with Claude was straightforward and mistakes were easily corrected.  My first attempt at building a site with Gemini Pro was less satisfying.  I should have taken Chad's advice from the outset! While adding content to the site I ran into limitations with Netlify's free tier, so I ported the site to Cloudflare where I haven't encountered problems.

Bird and Landscape photos are processed in Adobe Lightroom and RAW files are converted to jpeg for posting. Pretty straightforward.

Getting up to speed on Astrophotography not so straightforward.  Required getting familiar with a collection of hardware and software: 

## **Astrophotography Equipment**

### Hardware

**Redcat 51 wifd telescope**. 51mm f/4.9 250mm focal length Petzval APO refractor. 2.39 arcseconds per pixel with minicam8. Horizontal FOV: 2.55°, Vertical FOV: 1.44°, Diagonal FOV: 2.93°. 

**ZWO EAF auto focuser** 

**ZWO 30mm f/5 guide scope, ZWO ASI120MM Camera**, 5.16 arc secs/pixel ,Search region 15 pixels 

**QHY minicam8 mono astro camera**, with cooled sensor and deep sky filter set . LRGB and  Ha, Oiii, Sii 3nm SHO filters. Sensor: Sony IMX585 (BSI, 1/1.2-inch)  Resolution: 3856 x 2180 (8.4 MP)  Pixel Size: 2.9μm x 2.9μm. Format: 1/1.2".  Sensor Width: 11.2 mm Height: 6.3 mm Diagonal: 12.84 mm

**Star Adventurer GTi equatorial mount**

**SVbony 241 hub, SVbony 5V dew shields** 

**Jackery explorer 300 plus portable power station**

### Software

* **Green Swamp Server** (GSS) controls Star Adventurer GTi equatorial mount
* **Stellarium** helps plan the night's imaging and provides a database of stars and deep sky objects
* **NINA** controls the hardware and enables data acquisition. A script specifies each step during the night
* **PHD2** takes input from the ZWO 30mm f/5 guide scope and ZWO ASI120MM guide camera system and sends signals to the mini PC to correct the mount's tracking
* **Remote Desktop Connection** links a laptop to the 12V mini PC attached to the tripod through WiFi. The 4 processes above are all installed on the mini PC.
* **Pixinsight** is used to process the Astro Data, probably the most challenging part:\
  Calibration & Stacking.\
  Registration & Integration.\
  Light Pollution Extraction.\
  Color Calibration & Astrometric Plate Solving\
  Catalog-Based Color Calibration\
  Deconvolution & Denoising.\
  Noise Reduction.\
  Channel Combination & Pixel Arithmetic.\
  Non-Linear Stretching.\
  Dynamic Range Compression\
  Star Removal and independent star processing
* **Adobe Lightroom** provides finishing touches to the final image
