import { LiveSensor, Sensor } from '../interfaces/SensorType';

export class SpectrumService {
    private static socket: WebSocket | null = null;
    private static manualClose: boolean = false; 
    private static apiUrl = '://webfrontendassignment-isaraerospace.azurewebsites.net/api';
  
    public static async getStatus(): Promise<Sensor> {
      const response = await fetch(`https${this.apiUrl}/SpectrumStatus`);
      return response.json();
    }
  
    public static async actOnSensorData(): Promise<any> {
      const response = await fetch(`https${this.apiUrl}/ActOnSpectrum`);
      return response
    }
  
    public static getLiveSensorData(callback: (data: LiveSensor) => void): void {
      const connectWebSocket = () => {
        this.socket = new WebSocket(`wss${this.apiUrl}/SpectrumWS`);
  
        this.socket.onopen = () => {
          console.log('WebSocket connection opened.');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            callback(data);
          };
  
        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
  
        this.socket.onclose = (event) => {
          console.log('WebSocket connection closed:', event);
          // Attempt to reconnect after a short delay
          if (!this.manualClose) {
            // Reconnect only if not manually closed
            setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
          } else {
            this.manualClose = false; // Reset manual close flag
          }
        };
      };
  
      connectWebSocket();
    }
  
    public static closeWebSocketConnection(): void {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
        this.manualClose = true;
        
      }
    }
  }
  