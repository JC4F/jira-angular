import { IssueUtil } from '@/shared/utils/issue';
import {
  IssuePriority,
  IssuePriorityIcon,
  IssueType,
  IssueTypeWithIcon,
} from '@/types';

export class ProjectConst {
  static readonly IssueId = 'issueId';
  static readonly Projects = 'Projects';
  static PrioritiesWithIcon: IssuePriorityIcon[] = [
    IssueUtil.getIssuePriorityIcon(IssuePriority.LOWEST),
    IssueUtil.getIssuePriorityIcon(IssuePriority.LOW),
    IssueUtil.getIssuePriorityIcon(IssuePriority.MEDIUM),
    IssueUtil.getIssuePriorityIcon(IssuePriority.HIGH),
    IssueUtil.getIssuePriorityIcon(IssuePriority.HIGHEST),
  ];

  static IssueTypesWithIcon: IssueTypeWithIcon[] = [
    new IssueTypeWithIcon(IssueType.BUG),
    new IssueTypeWithIcon(IssueType.STORY),
    new IssueTypeWithIcon(IssueType.TASK),
  ];
}
