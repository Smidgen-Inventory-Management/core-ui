import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../../css/breadcrumb.css';


export function AppBreadcrumb({
  ...props
}: React.ComponentProps<typeof Breadcrumb>) {
  const pathState = useLocation();
  const [currentPath, setCurrentPath] = useState<string[]>([]);

useEffect(() => {
  if (pathState.pathname === '/') {
    setCurrentPath([]);
  } else {
    const newPath = pathState.pathname.split('/').filter(Boolean);
    if (newPath.join('/') !== currentPath.join('/')) {
      setCurrentPath(newPath);
    }
  }
}, [pathState.pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {currentPath.map((pathItem, index) => {
          while (index < currentPath.length) {
            return (
              <span style={{ display: 'contents' }} key={pathItem}>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={pathItem}>
                  <BreadcrumbLink href={pathItem}>{String(pathItem).charAt(0).toUpperCase() + String(pathItem).slice(1)}</BreadcrumbLink>
                </BreadcrumbItem>
              </span>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}