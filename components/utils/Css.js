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
  display: grid;
  margin: 25px auto;
  border-bottom: 1px solid black;
  color:black;
  text-decoration: none;
  gap: 5px;
  grid-template-areas:
    'i i i t t t t t t'
    'i i i s s s s s s'
    'i i i s s s s s s'
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
  width: 400px;
  word-wrap: break-word;
}
.article :nth-child(3) {
  grid-area: s;
  width: 400px;
  overflow: hidden;
}
.article :nth-child(4) {
  grid-area: l;
  margin-bottom: 10px;
}

.contact-card{
  margin:auto;
  width:500px;
}

.about{
margin:auto;
width:600px;
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
</style>
    `
}
