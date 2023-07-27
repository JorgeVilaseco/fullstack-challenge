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
  co2EstimateReduction: string[];
  owner: string;
  @IsArray()
  @ArrayNotEmpty()
  listing: string[];
}
