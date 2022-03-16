import './App.css';
import React, { useState } from 'react';
import axios from "axios";

function App() {
  const [Title, settitle] = useState('');
  const [Locations, setlocation] = useState([]);
  const [currlocations, setcurrlocation] = useState('');
  const [Description, setdescription] = useState('');
  const [Minimumyearofexperince, setminimumyearofexperince] = useState('');
  const [Maximumyearofexperince, setmaximumyearofexperince] = useState('');
  const [Category, setcategory] = useState('Select');
  const [Functionalarea, setfunctionalarea] = useState('Select');
  const [GraduatingMinBatch, setgraduatingminbatch] = useState('Select');
  const [GraduatingMaxBatch, setgraduatingmaxbatch] = useState('Select');
  const [Tags, settags] = useState([]);
  const [Currtag, setcurrtag] = useState([]);
  const handlekeydownoflocation = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      Locations.push(currlocations);
      setcurrlocation('');
      setlocation(Locations);
    }
  }
  const deletelocation = (index) => {
    var newlocation = [];
    var ii = index.index;
    for (var i = 0; i < Locations.length; i++) {
      if (i != ii) {
        newlocation.push(Locations[i]);
      }
    }
    setlocation(newlocation);
  }
  const handlekeydownoftag = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      Tags.push(Currtag);
      setcurrtag('');
      settags(Tags);
    }
  }
  const handlekeydown = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
    }
  }
  const deletetag = (index) => {
    var newtag = [];
    var ii = index.index;
    for (var i = 0; i < Tags.length; i++) {
      if (i != ii) {
        newtag.push(Tags[i]);
      }
    }
    settags(newtag);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    if (Title == '' || Locations == [] || Description == '' || Minimumyearofexperince == '' || Maximumyearofexperince == '' || Category == 'Select' || Functionalarea == 'Select' || GraduatingMaxBatch == 'Select' || GraduatingMinBatch == 'Select' || Tags == []) {
      alert("Some fields are not entered or selected.");
    }
    const fetchdata = async () => {
      try {
        const res = await axios.post('localhost:8001/v1jobs/job', {
          "Title": Title,
          "Locations": Locations,
          "Description": Description,
          "Minimumyearofexperince": Minimumyearofexperince,
          "Maximumyearofexperince": Maximumyearofexperince,
          "Category": Category,
          "Functionalarea": Functionalarea,
          "GraduatingMinBatch": GraduatingMinBatch,
          "GraduatingMaxBatch": GraduatingMaxBatch,
          "Tags": Tags,
        })
        var data = res.data;
        // console.log(data);
      } catch (e) {
        console.log("error during posting : ", e);
      }
    };
    fetchdata();
  }

  return (
    <div className="App">
      <h3 className='ms-5 mt-5'>POST JOB</h3>
      <form onSubmit={e => handlesubmit(e)} className='ms-5 mt-3 jobcontainer mb-5'>
        <h4 className='greentext'>Basic Details</h4>
        <hr></hr>
        <div class="mb-3">
          <label class="form-label">Job Title*</label>
          <input value={Title} onKeyDown={e => handlekeydown(e)} onChange={e => settitle(e.target.value)} class="form-control" placeholder='Write a title that appropriately describes this job' />
        </div>
        <div class="mb-3">
          <label class="form-label">Location*</label>
          <div className='d-flex flex-row bd-highlight mb-3'>
            {Locations.map((element, index) => <div onClick={e => deletelocation({ index })} className='locations p-2 bd-highlight mx-1'>{element}</div>)}
          </div>
          <input value={currlocations} onChange={e => setcurrlocation(e.target.value)} onKeyDown={ev => handlekeydownoflocation(ev)} class="form-control" placeholder='+ Add Location' />
        </div>
        <div class="mb-3">
          <label class="form-label">Years of experience*</label>
          <br></br>
          <input onKeyDown={e => handlekeydown(e)} value={Minimumyearofexperince} onChange={e => setminimumyearofexperince(e.target.value)} type="number" placeholder='Select Min' />
          <input onKeyDown={e => handlekeydown(e)} value={Maximumyearofexperince} onChange={e => setmaximumyearofexperince(e.target.value)} type="number" className='ms-3' placeholder='Select Max' />
        </div>
        <div className='mb-3'>
          <label class="form-label">Job Description*</label>
          <div class="textarea-container">
            <textarea value={Description} onKeyDown={e => handlekeydown(e)} onChange={e => setdescription(e.target.value)} rows="5" cols="60" placeholder='Describe the role and responsibilities, skills required for job and help the candidates to understand job better.'>
            </textarea>
            <img onClick={e => setdescription('')} className='forhover' src="refresh.png" />
          </div>
        </div>
        <h4 className='greentext'>Targeting</h4>
        <hr></hr>
        <div className='row'>
          <div class="mb-3 col">
            <label class="form-label">Category*</label>
            <div class="dropdown">
              <button class="btn border dropdown-toggle minarea" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {Category}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a value="Software Development" onClick={e => setcategory("Software Development")} class="dropdown-item">Software Development</a>
                <a value="Data Science" onClick={e => setcategory("Data Science")} class="dropdown-item">Data Science</a>
                <a value="Product Management" onClick={e => setcategory("Product Management")} class="dropdown-item">Product Management</a>
              </div>
            </div>
          </div>
          <div class="mb-3 col">
            <label class="form-label">Functional Area*</label>
            <div class="dropdown">
              <button class="btn border dropdown-toggle minarea" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {Functionalarea}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a value="Tech" onClick={e => setfunctionalarea("Tech")} class="dropdown-item">Tech</a>
                <a value="Sales" onClick={e => setfunctionalarea("Sales")} class="dropdown-item">Sales</a>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div class="mb-3 row">
            <label class="form-label">Graduating Year</label>
            <div class="dropdown col">
              <button class="btn border dropdown-toggle minarea" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {GraduatingMinBatch}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a value="2018" onClick={e => setgraduatingminbatch("2018")} class="dropdown-item">2018</a>
                <a value="2019" onClick={e => setgraduatingminbatch("2019")} class="dropdown-item">2019</a>
                <a value="2020" onClick={e => setgraduatingminbatch("2020")} class="dropdown-item">2020</a>
              </div>
            </div>
            <div class="dropdown col">
              <button class="btn border dropdown-toggle minarea" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {GraduatingMaxBatch}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a value="2020" onClick={e => setgraduatingmaxbatch("2020")} class="dropdown-item">2020</a>
                <a value="2021" onClick={e => setgraduatingmaxbatch("2021")} class="dropdown-item">2021</a>
                <a value="2022" onClick={e => setgraduatingmaxbatch("2022")} class="dropdown-item">2022</a>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Tags</label>
          <div className='d-flex flex-row bd-highlight mb-3'>
            {Tags.map((element, index) => <div onClick={e => deletetag({ index })} className='locations p-2 bd-highlight mx-1'>{element}</div>)}
          </div>
          <input value={Currtag} onChange={e => setcurrtag(e.target.value)} onKeyDown={ev => handlekeydownoftag(ev)} class="form-control" placeholder='+ Add job tags' />
        </div>
        <button type="submit" class="btn btn-success">Post job</button>
        <button class="btn greenborder ms-3">Post Job and add another job</button>
        <button class="btn ms-3">Cancel</button>
      </form>
    </div>
  );
}

export default App;
