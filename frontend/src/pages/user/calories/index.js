import { toInteger, toNumber } from 'lodash';
import React, { useState,useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';
const axios = require('axios');

const MyComponent = () => {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // const [image, setImage] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  setSelectedImage(file);
};

const handleUpload = () => {
  if (selectedImage) {
    const formData = new FormData();
    formData.append('image', selectedImage);
    setLoading(true);

    // Remove or update the Content-Type header
    fetch('http://127.0.0.1:5000/imageToItems', {
      method: 'POST',
      body: formData,
      mode: 'cors',
      headers: {
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        const newItems = result.data
        const total = newItems.reduce((acc, item) => {
          return acc + toInteger(item.calories)
        }, 0)
        // append this array to itemlist array
        setItemList([...itemList, ...newItems]);
        setTotalCalories(totalCalories+total)
      })
      .finally(() => {
        setLoading(false);
      })

      .catch(error => console.log('error', error));
  } else {
    console.warn('No image selected');
  }
};




  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //   const handleImageUpload = (e) => {
  //     // Handle image upload logic, set 'image' state accordingly
  //     // For simplicity, let's assume 'e.target.files[0]' contains the image file
  //     const uploadedImage = e.target.files[0];
  //     setImage(uploadedImage);
  //   };

  const handleAddCategory = () => {
    if (inputValue.trim() !== '') {


      let data = JSON.stringify({
        "items": [
          inputValue
        ]
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:5000/calculateCalories',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      setLoading(true);

      axios.request(config)
        .then((response) => {
          console.log(response.data.data[0].calories);

          const newCategory = { name: inputValue, number: 1 };
          setCategories([...categories, newCategory]);

          // Add a dummy calorie value for the example
          console.log(response.data.data.calories)
          const newItem = { foodName: newCategory.name, calories: parseInt(response.data.data[0].calories) };
          setItemList([...itemList, newItem]);

          // Update total calories
          setTotalCalories((prevTotal) => prevTotal + newItem.calories);

          setInputValue('');

        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDeleteItem = (index) => {
    const deletedItem = itemList[index];
    setTotalCalories((prevTotal) => prevTotal - deletedItem.calories);
    setItemList(itemList.filter((item, i) => i !== index));
  };
  console.log(itemList)

  useEffect(() => {
    var storedCalories = typeof window !== 'undefined' ? localStorage.getItem('dailyCalories') : null;

    // const storedCalories = localStorage.getItem('dailyCalories');
    storedCalories=parseInt(storedCalories)+parseInt(totalCalories);
    localStorage.setItem('dailyCalories',storedCalories);

  }, [totalCalories]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[55%] h-[100%] pr-4 pt-[20px] flex flex-col justify-center items-center">
        <div className="mb-4 w-[50%] h-[20%]">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter category name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddCategory}
            className="mt-2 p-2 bg-blue-500 text-white rounded w-[100%]"
          >
            Add Category
          </button>
        </div>


      
        <div className='w-[50%] h-[80%] pt-[10px]'>
          <div className="flex flex-row w-[100%] mx-auto gap-x-16 justify-center h-[100%]">
            <div className="flex flex-col items-center">

              {selectedImage ?
                <img src={URL.createObjectURL(selectedImage)} alt="image" className="w-[300px] h-[300px]"/>
                :
                <div className="p-8 border-[3px] border-dotted border-gray-300 rounded-lg bg-gray-100 text-center flex flex-col justify-center items-center ">
                  <h2 className="text-xl font-semibold ">Image Upload</h2>
                  <label className="flex flex-col justify-center items-center mt-4 ">
                    <div className="cursor-pointer border-2 border-dotted h-[100%] w-[100%] border-gray-400 px-4 rounded-lg bg-white py-[30px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-gray-500"
                        height="24"
                        fill="gray"
                        viewBox="0 -960 960 960"
                        stroke="currentColor"
                      >
                        <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                      </svg>
                      <p className="text-gray-500 mt-2">
                        Choose a file or drag it here
                      </p>
                      <input
                        className=" hidden"
                        type="file"
                        accept=".jpg,.png"
                        onChange={handleImageChange}
                      />
                    </div>
                  </label>
                </div>
              }
              {/* <p>{image?.name}</p> */}
              {loading ? (
                <div className="mt-4">
                  <ScaleLoader color="#2563eb" />
                  Hold on!
                </div>
              ) : (
                <button
                  className="my-2 py-2 px-6 bg-blue-600 text-white rounded-full"
                  onClick={handleUpload}
                >
                  Upload Image
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
      <div className="w-[40%] h-[100%] border-l border-gray-300 p-20">
        <ul className="mb-4">
          {itemList.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-4 border-b border-gray-300 hover:hover:border-b-4 hover:border-blue-500 w-[100%]"
            >
              <div className='flex flex-row gap-x-[15px]'>
                <div>{index+1}. </div>
                {item.foodName} - <p>{item.calories}</p> Calories
              </div>
              <button
                onClick={() => handleDeleteItem(index)}
                className="text-red-500"
              >
                <h1 className='text-[25px] font-bold'>🗑</h1>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-end items-center mt-[40px]">
          <div className="font-bold text-lg">Total Calories:</div>
          <div className=" font-bold text-lg ml-2"><p>{totalCalories}</p></div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
