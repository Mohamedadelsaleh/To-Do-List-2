let inputBtn = document.querySelector(".addField input");
let addBtn = document.querySelector(".addField button");
let dataCont =document.querySelector(".dataAdded");
let dataCompCont =document.querySelector(".completedData")
let dataCount=document.querySelector(".NumOfTasks span");
let dataCompCount=document.querySelector(".tasksCompleted span");


// let idcounter=0;
let ArrOfAddedData =[];


/************************************ Set Data in Array ********************************************/

function setAddedDataInArr (dataFromUser)
{
  let savedData = {
    id:Date.now(),
    text:dataFromUser,
    dataIsCompleted:false,
  };
  ArrOfAddedData.push(savedData);
  console.log(ArrOfAddedData);
}

/************************************************************ */



if(localStorage.key(0)!=null)
{

  for (let i = 0; i < localStorage.length; i++) {
    // ArrOfAddedData[i].id =(localStorage.key(i));
    // ArrOfAddedData[i].text=localStorage.getItem(localStorage.key(i))[0];
    // ArrOfAddedData[i].dataIsCompleted=localStorage.getItem(localStorage.key(i))[1];
    ArrOfAddedData[i]={id:parseInt(localStorage.key(i)),text:JSON.parse(localStorage.getItem(localStorage.key(i)))[0],dataIsCompleted:JSON.parse(localStorage.getItem(localStorage.key(i)))[1]};
    if(ArrOfAddedData[i].dataIsCompleted)
    {

      let InitMessage2=document.querySelector(".completedDataMessage")

      if(document.body.contains(document.querySelector(".completedDataMessage")))
      {
          InitMessage2.remove();
      }

        let completeSpan= document.createElement("span");
        let textComp= document.createTextNode(ArrOfAddedData[i].text);
        completeSpan.setAttribute("id",ArrOfAddedData[i].id);
        completeSpan.appendChild(textComp);
        completeSpan.className='completeBox';

        let removeData= document.createElement("button");
        let textDelete= document.createTextNode("-");
        removeData.appendChild(textDelete);
        removeData.className = 'delete';

        completeSpan.appendChild(removeData);
        dataCompCont.appendChild(completeSpan);
        completeSpan.style.backgroundColor="green";


        calcDataCompleted()

    }
    else
    {

      let InitMessage=document.querySelector(".NoDataMessage");

      if(document.body.contains(document.querySelector(".NoDataMessage")))
      {
          InitMessage.remove();
      }
      
      let addSpan= document.createElement("span");
          addSpan.className='dataBox';
          addSpan.setAttribute("id",ArrOfAddedData[i].id)
          let textAdded= document.createTextNode(ArrOfAddedData[i].text);
          addSpan.appendChild(textAdded);

          /************************** Delete Button **********************/

          let removeData= document.createElement("button");
          let textDelete= document.createTextNode("-");
          removeData.appendChild(textDelete);
          removeData.className = 'delete';
          addSpan.appendChild(removeData);

          /************************* Check Button ************************/

          let checkData= document.createElement("button");
          let textChecked= document.createTextNode("Check");
          checkData.appendChild(textChecked);
          checkData.className = 'checked';
          addSpan.appendChild(checkData);

          /************************ Append Data in Span ******************/

          dataCont.appendChild(addSpan);

          calcDataInput();
    }

  }

}


/**************************** Delete From Array *****************************/

function deleteDataWith(DataID)
{
  ArrOfAddedData=ArrOfAddedData.filter(function deleteFromArray(f)
  {
    return f.id!=DataID;
  });
}

/************************************************** Add New Data ********************************/

function addDataFun ()
{
    if(inputBtn.value === '')
    {
        Swal.fire(
            `You Didn't Enter Any Data`,
            'Please Enter Your Data First!',
            'error'
          )
    }
    else
    {

        let InitMessage=document.querySelector(".NoDataMessage");

        if(document.body.contains(document.querySelector(".NoDataMessage")))
        {
            InitMessage.remove();
        }

        dataCont.innerHTML="";
        setAddedDataInArr(inputBtn.value);
        inputBtn.value='';

        ArrOfAddedData.forEach((savedData)=>{
          if(savedData.dataIsCompleted==false)
          {
          let addSpan= document.createElement("span");
          addSpan.className='dataBox';
          addSpan.setAttribute("id",savedData.id)
          let textAdded= document.createTextNode(savedData.text);
          localStorage.setItem(savedData.id,JSON.stringify([savedData.text,savedData.dataIsCompleted]));
          console.log(savedData.text);
          addSpan.appendChild(textAdded);

          /************************** Delete Button **********************/

          let removeData= document.createElement("button");
          let textDelete= document.createTextNode("-");
          removeData.appendChild(textDelete);
          removeData.className = 'delete';
          addSpan.appendChild(removeData);

          /************************* Check Button ************************/

          let checkData= document.createElement("button");
          let textChecked= document.createTextNode("Check");
          checkData.appendChild(textChecked);
          checkData.className = 'checked';
          addSpan.appendChild(checkData);

          /************************ Append Data in Span ******************/

          dataCont.appendChild(addSpan);
          
        }
      });
      
        calcDataInput();


      
        // idcounter++;
    }
}


/********************************************************* Delete Any Data ****************************/

function deletefun(e)
{
    if(e.target.className=='delete')
    {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteDataWith(e.target.parentNode.getAttribute("id"));
                localStorage.removeItem(e.target.parentNode.getAttribute("id"))
                e.target.parentNode.remove();

              
                Swal.fire(
                'Deleted!',
                'Your Data has been deleted.',
                'success'
              )

              if (dataCont.childElementCount == 0)
              {
                noDataAdded ();
              }
              
              if(dataCompCont.childElementCount == 0)
              {
                noDataCompleted ();
              }
              calcDataInput();
              calcDataCompleted()
            }
          })
        
    }

}

/************************************ Complete Data When Checked ****************************************/

function completedData(e)
{
    if(e.target.className == 'checked')
    {

        let InitMessage2=document.querySelector(".completedDataMessage")

        if(document.body.contains(document.querySelector(".completedDataMessage")))
        {
            InitMessage2.remove();
        }

        e.target.parentNode.remove();
        calcDataInput();
        let completeSpan= document.createElement("span");
        let textComp= document.createTextNode(JSON.parse(localStorage.getItem(e.target.parentNode.id))[0]);
        console.log(textComp);
        localStorage.setItem(e.target.parentNode.id,JSON.stringify([JSON.parse(localStorage.getItem(e.target.parentNode.id))[0],true]));
        for(let i=0;i<ArrOfAddedData.length;i++)
        {
          if(ArrOfAddedData[i].id==e.target.parentNode.id)
          {
            ArrOfAddedData[i].dataIsCompleted=true;
            break; 
          }
        }
        completeSpan.setAttribute("id",e.target.parentNode.id);
        completeSpan.appendChild(textComp);
        completeSpan.className='completeBox';

        let removeData= document.createElement("button");
        let textDelete= document.createTextNode("-");
        removeData.appendChild(textDelete);
        removeData.className = 'delete';

        completeSpan.appendChild(removeData);
        dataCompCont.appendChild(completeSpan);
        completeSpan.style.backgroundColor="green";

        if (dataCont.childElementCount == 0)
        {
          noDataAdded ();
        }
        
        if(dataCompCont.childElementCount == 0)
        {
          noDataCompleted ();
        }

        calcDataCompleted()
        
    }
}


/******************************************* Function of No Data Input OR Completed ***********************/

function noDataAdded ()
{
    let noDataMsgSpan=document.createElement("span");
    let noDataMessage=document.createTextNode("No Input Data");
    
    noDataMsgSpan.appendChild(noDataMessage);
    noDataMsgSpan.className='NoDataMessage'

    dataCont.appendChild(noDataMsgSpan)

}

function noDataCompleted ()
{
    let noCompMsgSpan=document.createElement("span");
    let noCompMessage=document.createTextNode("No Completed Data");
    
    noCompMsgSpan.appendChild(noCompMessage);
    noCompMsgSpan.className='completedDataMessage'

    dataCompCont.appendChild(noCompMsgSpan)

}


/************************************* Count Data Added Or Completed ********************************/

function calcDataInput()
{
    dataCount.innerHTML = document.querySelectorAll('.dataAdded .dataBox').length;
}

function calcDataCompleted()
{
    dataCompCount.innerHTML = document.querySelectorAll('.completedData .completeBox').length;
}

/********************************************* Events ******************************************/

addBtn.addEventListener('click',addDataFun);
let deleBtn = addEventListener('click',deletefun);
let checkedBtn = addEventListener('click',completedData);