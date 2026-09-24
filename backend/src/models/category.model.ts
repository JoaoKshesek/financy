import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from 'type-graphql'
import { UserModel } from './user.model'
import { CategoryColor, CategoryIcon } from '../generated/prisma/enums.js'

export { CategoryColor, CategoryIcon }

registerEnumType(CategoryIcon, {
  name: 'CategoryIcon',
  description: 'Icon for the category',
})

registerEnumType(CategoryColor, {
  name: 'CategoryColor',
  description: 'Color for the category',
})

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => CategoryIcon)
  icon!: CategoryIcon

  @Field(() => CategoryColor)
  color!: CategoryColor

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
