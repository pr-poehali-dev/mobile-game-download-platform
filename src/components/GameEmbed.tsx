import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface GameEmbedProps {
  gameTitle: string;
  gameId: number;
}

const GameEmbed = ({ gameTitle, gameId }: GameEmbedProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById(`game-iframe-${gameId}`) as HTMLIFrameElement;
    if (!document.fullscreenElement) {
      iframe?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getGameUrl = (id: number) => {
    const gameUrls: Record<number, string> = {
      4: 'https://poki.com/en/g/brawl-stars-online',
      5: 'https://poki.com/en/g/combat-reloaded',
      6: 'https://poki.com/en/g/combat-online',
    };
    return gameUrls[id] || 'https://poki.com/en/g/subway-surfers';
  };

  if (!isPlaying) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Gamepad2" size={24} className="text-primary" />
            Играть прямо в браузере
          </CardTitle>
          <CardDescription>
            Нажмите кнопку ниже, чтобы начать играть без скачивания
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-4 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Play" size={64} className="text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Игра готова к запуску</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsPlaying(true)}
            className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Icon name="Play" size={24} className="mr-2" />
            Начать игру
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Gamepad2" size={24} className="text-primary" />
            {gameTitle}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <iframe
            id={`game-iframe-${gameId}`}
            src={getGameUrl(gameId)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline"
            onClick={() => setIsPlaying(false)}
            className="flex-1"
          >
            <Icon name="StopCircle" size={18} className="mr-2" />
            Остановить
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Перезапустить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameEmbed;
