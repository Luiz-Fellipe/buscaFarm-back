import { PaginationProps } from '@shared/dtos/IPaginationProps';

export default interface IFindBudgetDTO extends PaginationProps {
  user_id: string;
  date: Date;
}
