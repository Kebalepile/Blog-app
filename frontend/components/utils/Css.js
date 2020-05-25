export default () => {
  return `
 <style> 
  
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#sub{
  background-color:gray;
  color:white;
  padding-top:10px;
  padding-bottom:10px;
  width:350px;
  height:30vh;
  display:flex;
  flex-flow:column wrap;
  margin-left:5px;
}
#sub > * {
  margin:auto;
  border-radius:1px;
}
legend  {
    cursor:pointer;
  }
.socials{
  list-style-type: none;
}
.socials > li {
  margin:10px;
  width:50px;
  height:50px;
  cursor:pointer;
}

.navbar {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  width: 200px;
}

.navbar :nth-child(2) {
  border-left: 1px dashed black;
  border-right: 1px dashed black;
}

.navbar > * > *{
  text-decoration: none;
  padding: 5px;
  font-family:Helvetica;
}

.nav-a {
  color: black;
}

#darkmode {
  float: right;
  margin-right: 20px;
}
#mode {
  cursor: pointer;
}

.searchbar {
  float: right;
  margin-top: 40px;
  margin-right:20px;
}
.searchbar > input[type='search'] {
  width: 300px;
  height: 30px;
}
.searchbar > input[type='submit'] {
  width: 50px;
  height: 24px;
  cursor: pointer;
}

.headline {
  width:100%;
  display: grid;
  margin: 25px auto;
  border-bottom: 1px solid black;
  color:black;
  text-decoration: none;
  gap: 4px;
  grid-template-areas:
    'i i i t t t t t t'
    'i i i s s s s s s'
    '. . . s s s s s s'
    '. . . l l l . . .';
}

.headline > * {
  border: none;
}
.headline :nth-child(1) {
  grid-area: i;
  width: 150px;
  height: 150px;
  border-radius:2px;
}

.headline :nth-child(2) {
  grid-area: t;
  width: 70%;
  word-wrap: break-word;
  font-size:25px;
}

.headline :nth-child(3) {
  grid-area: s;
  width:90%;
  overflow: hidden; 
  padding:5px;
  border-radius:2px;
  text-align:left;
  
}

.headline :nth-last-child(1) {
  grid-area: l;
  margin-bottom: 10px;
}

.contact-card{
  margin:auto;
  width:60%;
}

.about{
  margin:auto;
  width:50%;
}
.about :nth-child(1){
  display: flex;
}

#pp{
  width:200px;
  height:200px;
  padding:5px;
  margin-right:5px;
}
#pp > img {
  border-radius:2px;
}

.alert{
  position:fixed;
  top:30%;
  left:45%;
  width:200px;
  height:180px;
  background-color:white;
  border: 1px solid gray;
  z-index:5;
  text-align:center;
}

.alert > .header{
  color:white;
  background-color:orange;
  padding:5px;
}

.btn {
  background-color:green;
  height:30px;
  width:50px;
  margin-top:20px;
  border:none;
  color:white;
  cursor:pointer;
}

.btn2 {
  background-color:red
}

#publish {
  width:80%;
  margin: auto;
  display:flex;
  flex-flow:column wrap;
  justify-content:center;
  align-items:center;
}
#publish > * {
  margin-top:30px;
}

.full-article{
  width:75%;
  margin: 100px auto;
}
.article-title{
  width:70%;
  margin:auto;
}
.article-body{
  width:65%;
  margin:auto;
  text-align:left;
  background-color: #fcfcfc;
  padding:25px; 
  border-radius:2px;
}
.loading{
  width:200px;
  margin:30vh auto;
  text-align:center;
}
@media screen and (max-width: 720px) {
  #headline-body {
    width:100%;
    height:400px;
    text-align:left;
    font-size:14px;
    padding:0;
  }
  #summary-headline{
    width:300px;
  }
  .full-article{
    width:80%;
    margin: 100px auto;
  }
  
 .article-title{
    width:90%;
    margin:auto;
  }
 .article-body{
    width:100%;
    margin:auto;
  }
}
@media screen and (max-width: 750px) {
  .searchbar {
    margin-left:20px;
  }
  .headline {
    grid-template-areas:
      'i i i t t t t t t'
      's s s s s s s s s'
      's s s s s s s s s'
      '. . . l l l . . .';
  }
  .headline :nth-child(1) {
    width: 95px;
    height: 95px;
  }
  .headline :nth-child(2) { 
    width: 100%;
    font-size:20px;
  }
    .headline :nth-child(3) {
     width: 100%;
     background-color: #fcfcfc;
  }
  .headline :nth-child(4) {
    width:150px;
  }
 
 .about{
    width:100%;
  }

}

@media screen and (max-width: 1200px) {
  .about{
    width:50%;
  }
  .about :nth-child(1){
    display: flex;
    flex-flow:column;
    align-items:center;
  }
  #pp{
    padding:10px;
  }
 
}
</style>
    `
}
