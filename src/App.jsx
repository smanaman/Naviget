import React, { useState } from 'react'
import './App.css'
function App() {
  // const [ActiveButton, SetActiveButton] = useState('')
  const [name, setname] = useState('')
  const [priority, setpriority] = useState('')
  const [user, setuser] = useState(JSON.parse(localStorage.getItem('todo')) || [])
  const [edit, setedit] = useState(null)
  // const [isChecked, setIsChecked] = useState(false);
  // const [allcheak, setallcheak] = useState(false)
  const [remo, setremo] = useState([])
  const setalldelet = (val) => {

    setremo([...remo, val])

  }
  const setall = () => {
    const removeall = user.filter((val) => !remo.some((item) => item.id === val.id));
    setuser(removeall)
    localStorage.setItem('todo', JSON.stringify(removeall))
    console.log(removeall);

  }
  console.log(remo);
  const setalldelet2 = () => {
    localStorage.removeItem('todo');
    setuser([]);  
    console.log('All data deleted successfully!');
};

  const haendle = (e) => {
    e.preventDefault()


    if (name == '' && priority == '') {
      alert('Enter the input fild')
    } else {
      setuser(pre => ([...pre, { name, priority, status: true, id: Math.floor(Math.random() * 100) }]))

    }
    if (edit != null) {

      let updatedData = user.map((val) => {

        if (val.id == edit.id) {

          val.name = name
          val.priority = priority

        }

        return (val)

      })

      setuser(updatedData);
      setedit(null)

    }

    setname('')
    setpriority('')
  }
  // console.log(user);

  localStorage.setItem('todo', JSON.stringify(user))


  // console.log(user);
  const toggle = (id) => {
    setuser((prevUser) =>
      prevUser.map((val) =>
        val.id === id ? { ...val, status: !val.status } : val
      )
    );
  };

  const delet = (id) => {
    const del = user.filter(val => val.id != id)
    localStorage.setItem('todo', JSON.stringify(del));

    setuser(del)

  }
  const add = (id) => {

    const single = user.find(val => val.id == id)

    setedit(single)
    setname(single.name)
    setpriority(single.priority)

  }
  return (
    <>
    <div className="button-group"> <button className='selectdelet' onClick={() => setall()}><i class="fa-solid fa-trash" style={{colo: '#f4f5f6'}}></i>Select</button>
    <button className='selectdelet' onClick={() => setalldelet2()}><i class="fa-solid fa-trash" style={{colo: '#f4f5f6'}}></i>Delet All</button></div>
    
      <div className="main-div">
        <div className="input-fild">
          <form onSubmit={haendle}>
            <input value={name} className='input1' type="text" onChange={(e) => setname(e.target.value)} placeholder='Enter task' />
            <input value={priority} className='input2' type="text" onChange={(e) => setpriority(e.target.value)} placeholder='priority' />
            {
              edit != null ?
                (<button className='button' type='submit'>Edit</button>) :
                (<button className='button' type='submit'>submit</button>)
            }
          </form>
        </div>
        {/* <input checked={isChecked}
          onChange={() => setIsChecked(!isChecked)} type="checkbox" /> */}


        {
          user.map((val) => {

            return (

              <div className="task-div">
                <div className="task">
                  <span>Task </span><br />
                  <span>{val.name}</span>
                </div>
                <div className="discription">
                  <span>priority</span><br />
                  <span>{val.priority}</span>
                </div>
                <div className="user-active">

                  <button onClick={() => toggle(val?.id, val?.status)}>{val.status === true ? 'active' : 'dactive'}</button>
                </div>
                <div className="cheakbox">
                  <input onClick={() => setalldelet(val)} type="checkbox" />

                </div>
                <div onClick={() => add(val?.id)} className="add"><i class="fa-solid fa-pen-to-square"></i></div>
                <div onClick={() => delet(val?.id)} className="delet"><i class="fa-solid fa-trash"></i></div>

              </div>
            )
          })
        }




      </div>
     
    </>
  )
}


export default App
