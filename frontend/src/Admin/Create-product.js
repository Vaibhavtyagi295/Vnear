import React from 'react';

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: null, // Initialize image state as null
    };
  }

  createCategory = () => {
    import('axios').then((axios) => {
      const categoryData = new FormData();
      categoryData.append('name', this.state.name);
      categoryData.append('image', this.state.image); // Append the selected image file to the form data

      axios.default.post('/categories', categoryData)
        .then((response) => {
          console.log('Category created:', response.data);
          // Handle the response if needed
        })
        .catch((error) => {
          console.error('Error creating category:', error);
          // Handle the error if needed
        });
    });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] }); // Update the image state with the selected file
  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        <input type="file" onChange={this.handleImageChange} />
        <button onClick={this.createCategory}>Create Category</button>
      </div>
    );
  }
}

export default CategoryPage;
