import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


export type CategoryModelProps = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}

@Table({ tableName: 'categories', timestamps: false })
export class CategoryModel extends Model<CategoryModelProps> {
  @PrimaryKey
  @Column({ type: DataType.STRING, primaryKey: true, allowNull: false })
  declare id: string;

  @Column({ type: DataType.STRING(255), field: 'name', allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, field: 'description', allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.BOOLEAN, field: 'is_active', allowNull: false })
  declare isActive: boolean;

  @Column({ type: DataType.DATE(3), field: 'created_at', allowNull: false })
  declare createdAt: Date;
}
