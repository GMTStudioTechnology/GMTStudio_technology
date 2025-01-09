// taskUtils.ts

interface WorkflowItem {
    id: number;
    text: string;
    checked: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    createdAt: string;
  }
  
  export const addThinkLinkTask = (taskDescription: string) => {
    const tasks = JSON.parse(localStorage.getItem('thinkLinkTasks') || '[]');
  
    const newTask: WorkflowItem = {
      id: tasks.length + 1,
      text: taskDescription,
      checked: false,
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };
  
    tasks.push(newTask);
    localStorage.setItem('thinkLinkTasks', JSON.stringify(tasks));
  
    console.log('New Think Link task added:', newTask);
  };