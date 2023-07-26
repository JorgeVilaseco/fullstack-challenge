import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  co2EstimateReduction: number[];
  owner: string;
  @IsArray()
  @ArrayNotEmpty()
  listing: string[];
}
