import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CatDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsInt()
  @Min(1)
  @Max(100)
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  readonly breed: string;
}
