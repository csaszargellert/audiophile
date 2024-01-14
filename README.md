<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/csaszargellert/audiophile">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<a href="https://audiophile-frontendmentor.xyz"><img src="images/landing-page.png"/></a>
<div aling="center">
  <h3 align="center">Audiophile</h3>
  
  <p>
    This is an e-commerce website where users can browse through variety of products, like them and add them to carts. Users can leave reviews and ratings about products. Login is required to make a purchase and the integrated Stripe API insures that bank account details remain private and protected.
  </p>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Docker][Docker.com]][Docker-url]
* [![Express.js][Express.js]][Express-url]
* [![Styled-Components][Styled-components]][Styled-Components-url]
* [![React Router][React-Router]][React-Router-url]
* [![Vite][Vite]][Vite-url]
* [![AWS][AWS]][AWS-url]
* [![MongoDB][Mongo]][Mongo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

* [Node.js](https://nodejs.org/en) installed
* [Terraform](https://www.terraform.io/) installed
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) installed
* [Stripe](https://stripe.com/) account

### Setup

1. Clone the repo
 ```sh
 git clone https://github.com/csaszargellert/audiophile.git <YOUR PROJECT FOLDER>
 ```
#### Setup AWS S3 bucket

We will provision an AWS S3 Bucket and an IAM User with a Policy that only has access to CREATING, GETTING and DELETING objects inside the Bucket.

2. Change into ***aws-s3*** folder
 ```sh
 cd <YOUR PROJECT FOLDER>/terraform/aws-s3
 ```
3. In *terraform.tfvars* give values to variables
 ```sh
 aws_version = "<YOUR VALUE>"
 s3_bucket_name = "<YOUR VALUE>"
 iam_policy_name = "<YOUR VALUE>"
 iam_user_name = "<YOUR VALUE>"
 ```
4. Make sure *aws credentials* file is located at ~/.aws/credentials OR if it is located somewhere else, do not forget to change reference in *providers.tf* file
5. Initialize terraform
 ```sh
 terraform init
 ```
6. Apply terraform 
 ```sh
 terraform apply -auto-approve
 ```
   **ATTENTION**: Keep cli open because you will need the output values in ***config.env***
#### Setup server
7. Change directory to server
 ```sh
 cd <YOUR PROJECT FOLDER>/server
 ```
8. Install dependencies
  ```sh
  npm install
  ```
9. Create ***config.env*** inside server directory
 ```sh
 touch config.env
 ```
10. Copy variables into ***config.env*** and provide values
   ```sh
   DB_PASSWORD=<YOUR DATABASE PASSWORD>
   DB_USERNAME=<YOUR DATABASE USERNAME>
   DB_CONNECTION="mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<YOUR DATABASE CLUSTER>/<YOUR DATABASE COLLECTION>?retryWrites=true&w=majority"
   PORT=8080
   JWT_ACCESS_SALT=<RANDOM VALUE>
   JWT_REFRESH_SALT=<RANDOM VALUE>
   STRIPE_KEY=<YOUR STRIPE SECRET API KEY>
   CLIENT_URL='http://localhost:*'
   AWS_S3_ACCESS_KEY=<OUTPUT VALUE FROM TERRAFORM>
   AWS_S3_SECRET_KEY=<OUTPUT VALUE FROM TERRAFORM>
   AWS_S3_REGION=eu-west-3 # IF YOU WANT TO CHANGE VALUE MAKE SURE IT IS THE SAME AS "aws_version" IN variables.tf
   AWS_S3_BUCKET_NAME=<YOUR BUCKET NAME>
   STRIPE_REDIRECT_URL=http://localhost:5173 # 5173 is the port number vite is running on
   ```
11. Start server
  ```sh
  npm run dev
  ```
#### Setup client
12. Change directory to client
   ```sh
   cd <YOUR PROJECT FOLDER>/client
   ```
13. Install dependencies
  ```sh
  npm install
  ```
14. Create ***.env.local*** inside client directory
   ```sh
   touch .env.local
   ```
15. Copy variables into ***.env.local*** and provide values
   ```sh
   VITE_SERVER_URL='http://localhost:8080/api' # 8080 is the port number express is running on
   ```
16. Start client
  ```sh
  npm run dev
  ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->
## Usage

### Login credentials
##### Regular User:
*Email:* ```test1@test.com``` <br />
*Password:* ```Test1234.```
##### Admin User:
*Email:* ```test@test.com``` <br />
*Password:* ```Test1234.```

### Stripe information

**NOTE:** No information is saved regarding *shipping details* and *credit card details*.
<br />
You can provide any string under *Shipping address*, ```asdf``` is valid for all the fields. For mobile number you can use ```+1 234 567 8912```

*Card Number:* ```4242 4242 4242 4242```
<br />
*Expiration Date:* ```<ANY FUTURE DATE>```
<br />
*CVC:* ```<ANY 3-DIGIT NUMBER>```
 
<!-- CONTACT -->
## Contact

Gellért Császár - [linkedin/csaszargellert](https://www.linkedin.com/in/gellert-csaszar/) - csaszargellert@gmail.com

Project Link: [https://github.com/csaszargellert/ticketing](https://github.com/csaszargellert/ticketing)

Live site: [gellert-ticketing.online](https://www.gellert-ticketing.online/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Img Shields](https://shields.io)
* [Github Markdown Badges](https://github.com/Ileriayo/markdown-badges)
* [Github README template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/csaszargellert
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Docker.com]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[product-screenshot]: images/main-page.png
[Styled-Components]: https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[Styled-Components-url]: https://styled-components.com/
[React-Router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/en/main
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[AWS]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[AWS-url]: https://docs.aws.amazon.com/
[Mongo]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/
