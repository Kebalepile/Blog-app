export default () => {
  return `
    <style> 
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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

.nav-a {
  text-decoration: none;
  padding: 5px;
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

.article {
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

.article > * {
  border: none;
}
.article :nth-child(1) {
  grid-area: i;
  width: 150px;
  height: 150px;
}
.article :nth-child(2) {
  grid-area: t;
  width: 70%;
  word-wrap: break-word;
  font-size:25px;
}

 .article :nth-child(3) {
  grid-area: s;
  width:90%;
  overflow: hidden;
}
.article :nth-child(4) {
  grid-area: l;
  margin-bottom: 10px;
}

.contact-card{
  margin:auto;
  width:40%;
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
#sub1{
border-left: 1px solid black;
padding:5px;
}
#sub{
  background-color:gray;
  color:white;
  padding-top:10px;
  padding-bottom:10px;
  width:350px;
  height:200px;
  display:flex;
  flex-flow:column wrap;
  margin-left:5px;
}
#sub > * {
  margin:auto;
  border-radius:1px;
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
#article-body {
  height:500px;
  width: 600px;
  overflow-y:auto;
}
#summary-article{
  margin-top:20px;
  width:500px;
  height:150px;
  text-align:left;
  font-size:14px
}
#article-title{
width:300px;
  height:100%;
  text-align:left;
  font-size:14px;
}

@media screen and (max-width: 720px) {
  #article-body {
    width:100%;
    height:400px;
   text-align:left;
   font-size:14px;
   padding:0;
  }
  #summary-article{
    width:300px;
  }
  #artice-title{
    width:200px;
  }
}
@media screen and (max-width: 750px) {
  .searchbar {
    margin-left:20px;
  }
  .article {
    grid-template-areas:
      'i i i t t t t t t'
      's s s s s s s s s'
      's s s s s s s s s'
      '. . . l l l . . .';
  }
  .article :nth-child(1) {
    width: 95px;
    height: 95px;
  }
  .article :nth-child(2) { 
    width: 100%;
    font-size:20px;
  }
    .article :nth-child(3) {
     width: 100%;
  }
  .article :nth-child(4) {
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
  #sub1{
    border:none;
    border-top: 1px solid black;
    padding:10px;
  }
}
 

</style>
    `
}
