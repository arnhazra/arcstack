import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { randomUUID } from "crypto"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { InsightsRepository } from "./insights.repository"

@Injectable()
export class InsightsService {
  constructor(private readonly insightsRepository: InsightsRepository) { }

  async createProject(workspaceId: string, createProjectDto: CreateProjectDto) {
    try {
      const { name } = createProjectDto
      const count = await this.insightsRepository.countProjects(workspaceId)

      if (count < 10) {
        const projectPasskey = randomUUID()
        const project = await this.insightsRepository.createProject(workspaceId, name, projectPasskey)
        return project
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getProjects(workspaceId: string, searchQuery: string) {
    try {
      const projects = await this.insightsRepository.getProjectsByWorkspaceId(workspaceId, searchQuery)
      return projects
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewProject(workspaceId: string, projectId: string) {
    try {
      const project = await this.insightsRepository.findProjectById(projectId)
      const { workspaceId: workspaceIdFromProject } = project

      if (workspaceIdFromProject.toString() === workspaceId) {
        const analytics = await this.insightsRepository.findAnalyticsByProjectId(workspaceId, project.id)
        return { project, analytics }
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async deleteProject(workspaceId: string, projectId: string) {
    try {
      const project = await this.insightsRepository.findProjectById(projectId)
      const { workspaceId: workspaceIdFromProject } = project
      if (workspaceIdFromProject.toString() === workspaceId) {
        await this.insightsRepository.deleteProjectById(workspaceId, projectId)
        return { success: true }
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async createAnalytics(workspaceId: string, createAnalyticsDto: CreateAnalyticsDto) {
    try {
      const { component, event, info, statusCode, projectId, projectPasskey } = createAnalyticsDto
      const project = await this.insightsRepository.findProject(projectId, projectPasskey)
      if (project.workspaceId.toString() === workspaceId) {
        const projectId = project.id
        await this.insightsRepository.createAnalytics(workspaceId, projectId, component, event, info, statusCode)
        return { success: true }
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}