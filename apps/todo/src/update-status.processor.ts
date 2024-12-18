import { Process, Processor } from '@nestjs/bull';
import { UPDATE_QUEUE } from './constants';
import { Job } from 'bull';
import { PrismaService } from './prisma.service';

@Processor(UPDATE_QUEUE)
export class UpdateStatusProcessor {
  constructor(private readonly prisma: PrismaService) {}

  @Process('updateStatus')
  async updateStatus(job: Job<{ id: number }>): Promise<void> {
    const { id } = job.data;
    console.log('Processing job in queue for task id:', id);

    try {
      await this.prisma.toDo.delete({
        where: {
          id,
        },
      });
      console.log(`Task with id ${id} successfully deleted`);
    } catch (error) {
      console.error('Error processing task in queue:', error);
    }
  }
}
