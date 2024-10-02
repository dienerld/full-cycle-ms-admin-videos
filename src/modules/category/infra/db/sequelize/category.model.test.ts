import { DataType, Sequelize } from 'sequelize-typescript';

import { CategoryModel } from './category.model';


describe('[Integration] - CategoryModel', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [CategoryModel]
    });
    await sequelize.sync({ force: true });
  });


  test("mapping props", () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(CategoryModel.getAttributes());
    expect(attributes).toStrictEqual([
      "id",
      "name",
      "description",
      "isActive",
      "createdAt",
    ]);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({
      field: "id",
      fieldName: "id",
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: true,
      type: DataType.TEXT(),
    });

    const isActiveAttr = attributesMap.isActive;
    expect(isActiveAttr).toMatchObject({
      fieldName: "isActive",
      field: "is_active",
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    const createdAtAttr = attributesMap.createdAt;
    expect(createdAtAttr).toMatchObject({
      fieldName: "createdAt",
      field: "created_at",
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  test("create", async () => {
    const arrange = {
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "test",
      isActive: true,
      createdAt: new Date(),
    };
    const category = await CategoryModel.create(arrange);
    expect(category.toJSON()).toStrictEqual(arrange);
  });
});
