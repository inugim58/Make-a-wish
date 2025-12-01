

    // 1. 전역 패턴 설정 변수 정의 (moduleSize 추가)
    let patternSettings = {
        type: 'soft_heart_pattern', 
        moduleSize: 40, // 기본 모듈 크기
        color1: '#C93030', // 하트색 A (빨강)
        color2: '#FFFFFF',  // 하트색 B (흰색)
        color3: '#006400'  // 배경색 (진한 녹색)
    };

    // 2. DOM 요소 가져오기
    const canvas = document.getElementById('patternCanvas');
    const ctx = canvas.getContext('2d');
    const patternTitle = document.getElementById('currentPatternTitle');
    const canvasSize = canvas.width; // 600
    const instructionText = document.getElementById('instructionText');
    let currentCategory = 'custom';
    
    // 초기 실행 시 모듈 크기 및 색상 설정
    document.getElementById('pType').value = patternSettings.type;
    document.getElementById('moduleSizeInput').value = patternSettings.moduleSize; // 모듈 크기 초기화
    document.getElementById('pColor1').value = patternSettings.color1;
    document.getElementById('pColor2').value = patternSettings.color2;
    document.getElementById('pColor3').value = patternSettings.color3; 
    changeCategory('custom'); 
    previewPattern();


    // 3. '패턴 제작 (미리보기)' 함수
    function previewPattern() {
        const tempColor1 = document.getElementById('pColor1').value;
        const tempColor2 = document.getElementById('pColor2').value;
        const tempColor3 = document.getElementById('pColor3').value;
        // 새로 추가된 부분: 모듈 크기 입력 값을 읽어옵니다.
        const tempModuleSize = parseInt(document.getElementById('moduleSizeInput').value) || 40; 
        
        // 유효성 검사 (최소/최대)
        const validatedSize = Math.max(20, Math.min(100, tempModuleSize));

        drawTiledPattern(tempColor1, tempColor2, tempColor3, validatedSize);
        instructionText.textContent = `모듈 크기 ${validatedSize}px로 패턴 미리보기가 생성되었습니다. 마음에 들면 "색상 및 크기 저장"을 누르세요.`;
    }

    // 4. '색상 저장 및 적용' 함수
    function savePatternSettings() {
        patternSettings.color1 = document.getElementById('pColor1').value;
        patternSettings.color2 = document.getElementById('pColor2').value;
        patternSettings.color3 = document.getElementById('pColor3').value;
        
        // 새로 추가된 부분: 모듈 크기 저장
        let newSize = parseInt(document.getElementById('moduleSizeInput').value) || 40;
        patternSettings.moduleSize = Math.max(20, Math.min(100, newSize)); // 유효성 검사 후 저장
        document.getElementById('moduleSizeInput').value = patternSettings.moduleSize; // 저장된 값으로 입력 필드 업데이트

        instructionText.textContent = `✅ 하트 패턴 색상과 크기 (${patternSettings.moduleSize}px)가 저장되었습니다! 이제 목업에 적용됩니다.`;
        
        if (currentCategory !== 'custom') {
            drawContent(currentCategory);
        }
    }
    
    // 5. 메뉴 클릭 시 실행되는 함수
    function changeCategory(category) {
        const activeItem = document.querySelector('.sidebar .menu-item.active');
        if (activeItem) {
            activeItem.classList.remove('active');
        }
        document.getElementById(category).classList.add('active');
        currentCategory = category;

        let titleMap = {
            'custom': '나만의 부드러운 하트 패턴 그리기',
            'bowl': '그릇 목업 적용',
            'scarf': '목도리 목업 적용',
            'sock': '양말 목업 적용'
        };
        patternTitle.textContent = titleMap[category];
        
        if (category === 'custom') {
            instructionText.textContent = '좌측의 설정을 변경하고 "패턴 제작"을 눌러 미리보기를 확인하세요.';
            drawTiledPattern(patternSettings.color1, patternSettings.color2, patternSettings.color3, patternSettings.moduleSize);
        } else {
            instructionText.textContent = '현재 저장된 패턴 설정이 ' + titleMap[category] + '에 적용되었습니다.';
            drawContent(category);
        }
    }

    // 6. 그리기 함수 분기
    function drawContent(category) {
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        if (category === 'bowl') {
            drawBowlMockup();
        } else if (category === 'scarf') {
            drawScarfMockup();
        } else if (category === 'sock') {
            drawSockMockup();
        }
    }

    /* ------------------------------------------------ */
    /* 💖 핵심 로직 1: 부드러운 하트 모듈 그리기 (변화 없음) 💖  */
    /* ------------------------------------------------ */

    // 하트 모듈 그리기 함수
    function drawSoftHeartModule(ctx, x, y, size, color) {
        ctx.beginPath();
        const halfSize = size / 2;
        const quarterSize = size / 4;
        const eighthSize = size / 8;
        const topY = y - halfSize * 0.4; 

        // 시작점: 하트 아래쪽 뾰족한 꼭짓점
        ctx.moveTo(x, y + halfSize); 

        // 1. 왼쪽 곡선
        ctx.bezierCurveTo(
            x - halfSize * 1.1, topY + quarterSize, // 제어점 1
            x - halfSize * 0.7, topY - eighthSize, // 제어점 2
            x - quarterSize, topY - eighthSize * 2 // 왼쪽 둥근 부분의 정점
        );
        
        // 2. 왼쪽 둥근 부분에서 중앙 홈으로
        ctx.bezierCurveTo(
            x - quarterSize * 0.5, topY - eighthSize * 3, // 제어점 3
            x - eighthSize, topY - eighthSize * 3, // 제어점 4
            x, topY // 중앙 홈
        );
        
        // 3. 중앙 홈에서 오른쪽 둥근 부분으로
        ctx.bezierCurveTo(
            x + eighthSize, topY - eighthSize * 3, // 제어점 5
            x + quarterSize * 0.5, topY - eighthSize * 3, // 제어점 6
            x + quarterSize, topY - eighthSize * 2 // 오른쪽 둥근 부분의 정점
        );

        // 4. 오른쪽 곡선
        ctx.bezierCurveTo(
            x + halfSize * 0.7, topY - eighthSize, // 제어점 7
            x + halfSize * 1.1, topY + quarterSize, // 제어점 8
            x, y + halfSize // 시작점으로 돌아가 닫기
        );

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }


    /* ------------------------------------------------ */
    /* 💖 핵심 로직 2: 엇갈린 하트 패턴 그리기 (moduleSize 사용) 💖  */
    /* ------------------------------------------------ */

    // 7. 하트 패턴 그리기 (moduleSize 인자 추가)
    function drawTiledPattern(heartColor1, heartColor2, bgColor, moduleSize) {
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // 1. 배경색 채우기
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        
        // ************************************************************
        // 수정된 부분: 전달받은 moduleSize를 사용하여 패턴 크기 정의
        // ************************************************************
        const moduleUnit = moduleSize; 
        const heartSize = moduleUnit * 0.9; 
        
        // 캔버스 크기에 맞춰 반복 횟수 재계산
        // 모듈이 캔버스 크기를 정확히 나누지 못할 경우를 대비해 여유있게 반복
        const numCols = canvasSize / moduleUnit; 
        const numRows = canvasSize / moduleUnit; 

        // 2. 엇갈린 격자무늬 패턴 그리기
        for (let row = 0; row < numRows + 2; row++) { 
            for (let col = 0; col < numCols + 2; col++) { 
                
                // 엇갈림 (Staggered) 로직: 홀수 행만 반 칸 이동
                let offsetX = 0;
                if (row % 2 !== 0) {
                    offsetX = moduleUnit / 2;
                }
                
                // 하트의 중심 좌표 계산
                const centerX = col * moduleUnit + offsetX;
                const centerY = row * moduleUnit;

                // 색상 교차 로직: 행과 열의 합에 따라 색상 교차
                let heartColor = ((row + col) % 2 === 0) ? heartColor1 : heartColor2;

                // 하트 모듈 그리기
                drawSoftHeartModule(
                    ctx,
                    centerX, // 하트의 중심 X
                    centerY, // 하트의 중심 Y
                    heartSize,
                    heartColor
                );
            }
        }
    }


    /* ------------------------------------------------ */
    /* 목업 적용 로직 (patternSettings.moduleSize 사용) */
    /* ------------------------------------------------ */

    // 9. 목업 도형 내부에 패턴을 채우는 범용 함수
    function fillPatternInShape(drawShapeCallback) {
        ctx.save();
        
        // 1. 도형의 윤곽선을 그리고 클리핑 (Clip)
        drawShapeCallback();
        ctx.clip(); 

        // 2. 클리핑된 영역에 패턴 그리기 (저장된 모듈 크기 사용)
        drawTiledPattern(
            patternSettings.color1, 
            patternSettings.color2, 
            patternSettings.color3, 
            patternSettings.moduleSize // 저장된 모듈 크기 전달
        );
        
        ctx.restore();

        // 3. 테두리 다시 그리기
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 5;
        drawShapeCallback(); 
        ctx.stroke();
    }
    
    // 10. 그릇 목업 (원형)
    function drawBowlMockup() {
        const centerX = canvasSize / 2;
        const centerY = canvasSize / 2;
        const radius = canvasSize * 0.4;
        
        const drawShape = () => {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        };

        fillPatternInShape(drawShape);
    }

    // 11. 목도리 목업 (사각형)
    function drawScarfMockup() {
        const width = canvasSize * 0.8;
        const height = canvasSize * 0.3;
        const x = canvasSize * 0.1;
        const y = canvasSize * 0.35;
        
        const drawShape = () => {
            ctx.beginPath();
            ctx.rect(x, y, width, height);
        };

        fillPatternInShape(drawShape);
    }

    // 12. 양말 목업 (복합 도형)
    function drawSockMockup() {
        const scale = canvasSize * 0.7;
        const offsetX = canvasSize * 0.2;
        const offsetY = canvasSize * 0.1;
        
        const drawShape = () => {
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            ctx.lineTo(offsetX + scale * 0.2, offsetY);
            ctx.lineTo(offsetX + scale * 0.2, offsetY + scale * 0.6);
            ctx.lineTo(offsetX + scale * 0.05, offsetY + scale * 0.7);
            ctx.arc(offsetX + scale * 0.25, offsetY + scale * 0.7, scale * 0.25, Math.PI, 0, false);
            ctx.lineTo(offsetX, offsetY + scale * 0.5);
            ctx.closePath();
        };

        fillPatternInShape(drawShape);
    }
