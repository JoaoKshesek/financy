import { Query, Resolver, UseMiddleware } from 'type-graphql'
import { DashboardModel } from '../models/dashboard.model'
import { GqlUser } from '../graphql/decorators/user.decorator'
import { IsAuth } from '../middlewares/auth.middleware'
import { UserModel } from '../models/user.model'
import { DashboardService } from '../services/dashboard.service'

@Resolver(() => DashboardModel)
@UseMiddleware(IsAuth)
export class DashboardResolver {
  private dashboardService = new DashboardService()

  @Query(() => DashboardModel)
  async dashboard(@GqlUser() user: UserModel): Promise<DashboardModel> {
    return this.dashboardService.getDashboard(user.id) as Promise<DashboardModel>
  }
}
