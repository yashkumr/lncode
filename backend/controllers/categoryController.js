import slugify from "slugify";
import categoryModal from "../models/categoryModal.js";

//
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      categoryImage: cate.categoryImage,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
//
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModal.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const categoryObj = {
      name: req.body.name,
      slug: slugify(name),
      createdBy: req.user._id,
    };

    if (req.file) {
      categoryObj.categoryImage = req.file.filename;
    }
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    const category = new categoryModal(categoryObj);

    await category.save();
    console.log(category);

    res.status(200).send({
      success: true,
      message: "Category created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, parentId, type } = req.body;
    
    const updatedCategories = [];
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        const category = {
          name: name[i],
          type: type[i],
        };
        if (parentId[i] !== "") {
          category.parentId = parentId[i];
        }

        const updatedCategory = await categoryModal.findOneAndUpdate(
          { _id: _id[i] },
          category,
          { new: true }
        );
        updatedCategories.push(updatedCategory);
      }
      return res.status(201).send({
        success: true,
        message: "Category Updated SuccessFully",
        updateCategories: updatedCategories,
      });
    } else {
      const category = {
        name,
        type,
      };
      if (parentId !== "") {
        category.parentId = parentId;
      }
      const updatedCategory = await categoryModal.findOneAndUpdate(
        { _id },
        category,
        {
          new: true,
        }
      );
      return res.status(201).send({
        success: true,
        message: "Category Updated SuccessFully",
        updatedCategory,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error in category controller",
    });
  }
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    // categoryModal.find({}).exec((categories) => {
    //   if (categories) {
    //     const category = createCategories(categories);
    //     res.status(200).json({ category });
    //   }
    // });

    const categories = await categoryModal.find({});

    if (categories) {
      const category = createCategories(categories);

      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModal.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    
    const { checkedIdsArray } = req.body;
    console.log(req.body);
    console.log("hello");
    console.log(checkedIdsArray);
  


    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
      const deleteCategory = await categoryModal.findOneAndDelete({
        _id: ids[i]._id,
        createdBy: req.user._id,
      });
      deletedCategories.push(deleteCategory);
    }

    if (deletedCategories.length == ids.length) {
      res.status(201).send({success:true, message: "Categories removed" });
    } else {
      res.status(400).json({success:false, message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in category Controller",
      error,
    });
  }
};
