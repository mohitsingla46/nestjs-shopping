import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Role {
    @Prop()
    name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);